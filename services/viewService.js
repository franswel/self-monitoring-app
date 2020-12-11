import { deleteCache, executeQuery, executeCachedQuery } from "../database/database.js";

const getDate = async() => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}

const setMorning = async(date, duration, quality, mood, id) => {
  await deleteCache();
  await executeQuery("INSERT INTO morning (date, sleep_duration, sleep_quality, mood, user_id) VALUES ($1,$2,$3,$4,$5);", date, duration, quality, mood, id);
}

const setEvening = async(date, sport, study, eat_r, eat_q, mood, id) => {
  await deleteCache();
  await executeQuery("INSERT INTO evening (date, sport_hours, study_hours, eating_regularity, eating_quality, mood, user_id) VALUES ($1,$2,$3,$4,$5,$6,$7);", date, sport, study, eat_r, eat_q, mood, id);
}

const isSubmitted = async(id) => {
  let data = {
    morning: "No data submitted yet",
    evening: "No data submitted yet",
  };
  let today = await getDate();
  const isMorning = await executeCachedQuery("SELECT * FROM morning WHERE user_id=$1 AND date=$2;", id, today);
  if (isMorning && isMorning.rowCount > 0) {data.morning = "Done!";};
  const isEvening = await executeCachedQuery("SELECT * FROM evening WHERE user_id=$1 AND date=$2;", id, today);
  if (isEvening && isEvening.rowCount > 0) {data.evening = "Done!";};

  return data;
}

const getMessage = async(id) => {
  let data = {
    mood_today: "",
    mood_yesterday: "",
    message: ""
  };
  const avg_mood_today = await executeCachedQuery(
    "SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening  WHERE user_id=$1 AND date BETWEEN NOW() - interval '1 days' AND NOW() \
    UNION ALL SELECT mood FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '1 days' AND NOW()) AS fodder;", id)
  const avg_mood_yesterday = await executeCachedQuery(
    "SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening  WHERE user_id=$1 AND date BETWEEN NOW() - interval '2 days' AND NOW() - interval '1 days' \
    UNION ALL SELECT mood FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '2 days' AND NOW() - interval '1 days') AS fodder;", id)

  if (avg_mood_today.rowsOfObjects()[0].mood !== null) {
    data.mood_today = Number(avg_mood_today.rowsOfObjects()[0].mood).toFixed(1);
  }
  if (avg_mood_yesterday.rowsOfObjects()[0].mood !== null) {
    data.mood_yesterday = Number(avg_mood_yesterday.rowsOfObjects()[0].mood).toFixed(1);
  }
  if (data.mood_today.length != 0 && data.mood_yesterday.length != 0) {
    if (Number(avg_mood_today.rowsOfObjects()[0].mood) >= Number(avg_mood_yesterday.rowsOfObjects()[0].mood)) {
      data.message = "Things are looking bright today!";
    } else {
      data.message = "Things are looking gloomy today...";
    }
  }

  return data;
}

const removeLastIfExists = async(date, table, id) => {
  if (table === 'morning') {
    const res = await executeCachedQuery("SELECT * FROM morning WHERE date=$1 AND user_id=$2;", date, id);
    if (res && res.rowCount > 0) {
      await deleteCache();
      await executeCachedQuery("DELETE FROM morning WHERE date=$1 AND user_id=$2;", date, id)
    }
  } else if (table === 'evening') {
    const res = await executeCachedQuery("SELECT * FROM evening WHERE date=$1 AND user_id=$2;", date, id);
    if (res && res.rowCount > 0) {
      await deleteCache();
      await executeCachedQuery("DELETE FROM evening WHERE date=$1 AND user_id=$2;", date, id)
    }
  }

  return null;
}

export { setMorning, setEvening, isSubmitted, getMessage, getDate, removeLastIfExists };