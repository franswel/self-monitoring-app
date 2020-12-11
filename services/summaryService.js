import { executeCachedQuery } from "../database/database.js";

const getWeeklySummary = async(id) => {
  const res = await executeCachedQuery(
    "SELECT AVG(sleep_duration) FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(sleep_quality) as quality FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(sport_hours) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(study_hours) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(eating_regularity) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(eating_quality) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening  WHERE user_id=$1 AND date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT mood FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '7 days' AND NOW()) AS fodder;", id);
  const lastWeek = res.rowsOfObjects();
  const data = {
    sleep_duration: Number(lastWeek[0].avg).toFixed(1),
    sleep_quality: Number(lastWeek[1].avg).toFixed(1),
    sports: Number(lastWeek[2].avg).toFixed(1),
    study: Number(lastWeek[3].avg).toFixed(1),
    eating_regularity: Number(lastWeek[4].avg).toFixed(1),
    eating_quality: Number(lastWeek[5].avg).toFixed(1),
    generic_mood: Number(lastWeek[6].avg).toFixed(1),
  };
  const res_trend = await executeCachedQuery(
    "SELECT AVG(sleep_duration) FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '14 days' AND NOW() - interval '7 days'  \
    UNION ALL SELECT AVG(sleep_quality) as quality FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '14 days' AND NOW() - interval '7 days'  \
    UNION ALL SELECT AVG(sport_hours) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '14 days' AND NOW() - interval '7 days'  \
    UNION ALL SELECT AVG(study_hours) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '14 days' AND NOW() - interval '7 days'  \
    UNION ALL SELECT AVG(eating_regularity) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '14 days' AND NOW() - interval '7 days'  \
    UNION ALL SELECT AVG(eating_quality) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '14 days' AND NOW() - interval '7 days'  \
    UNION ALL SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening  WHERE user_id=$1 AND date BETWEEN NOW() - interval '14 days' AND NOW() - interval '7 days'  \
    UNION ALL SELECT mood FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '14 days' AND NOW() - interval '7 days' ) AS fodder;", id);
  const previousWeek = res_trend.rowsOfObjects();
  const trend_data = ["","","","","","",""];
  for (let i=0; i < 7; i++) {
    if (lastWeek[i].avg && previousWeek[i].avg) {
      if (Number(lastWeek[i].avg) > Number(previousWeek[i].avg)) {
        trend_data[i] = "+";
      } else if (Number(lastWeek[i].avg) < Number(previousWeek[i].avg)) {
        trend_data[i] = "-";
      } else {
        trend_data[i] = "=";
      }
    }
  }
  let trends = {
    sleep_duration: trend_data[0],
    sleep_quality: trend_data[1],
    sports: trend_data[2],
    study: trend_data[3],
    eating_regularity: trend_data[4],
    eating_quality: trend_data[5],
    generic_mood: trend_data[6],
  };

  const value = {
    data: data,
    trends: trends
  };

  if (Number(data.sleep_quality) === 0.0) {
    return null;
  } else {
    return value;
  }
};

const getLastSevenDays = async() => {
  const res = await executeCachedQuery(
    "SELECT AVG(sleep_duration) FROM morning WHERE date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(sleep_quality) as quality FROM morning WHERE date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(sport_hours) FROM evening WHERE date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(study_hours) FROM evening WHERE date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(eating_regularity) FROM evening WHERE date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(eating_quality) FROM evening WHERE date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening WHERE date BETWEEN NOW() - interval '7 days' AND NOW() \
    UNION ALL SELECT mood FROM morning WHERE date BETWEEN NOW() - interval '7 days' AND NOW()) AS fodder;");
  const lastWeek = res.rowsOfObjects();
  const data = {
    sleep_duration: Number(lastWeek[0].avg).toFixed(1),
    sleep_quality: Number(lastWeek[1].avg).toFixed(1),
    sports: Number(lastWeek[2].avg).toFixed(1),
    study: Number(lastWeek[3].avg).toFixed(1),
    eating_regularity: Number(lastWeek[4].avg).toFixed(1),
    eating_quality: Number(lastWeek[5].avg).toFixed(1),
    generic_mood: Number(lastWeek[6].avg).toFixed(1),
  };
  if (Number(data.sleep_quality) === 0.0) {
    return "No data available.";
  } else {
    return data;
  }
};

const getMonthlySummary = async(id) => {
  const res = await executeCachedQuery(
    "SELECT AVG(sleep_duration) FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '30 days' AND NOW() \
    UNION ALL SELECT AVG(sleep_quality) as quality FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '30 days' AND NOW() \
    UNION ALL SELECT AVG(sport_hours) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '30 days' AND NOW() \
    UNION ALL SELECT AVG(study_hours) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '30 days' AND NOW() \
    UNION ALL SELECT AVG(eating_regularity) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '30 days' AND NOW() \
    UNION ALL SELECT AVG(eating_quality) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '30 days' AND NOW() \
    UNION ALL SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening  WHERE user_id=$1 AND date BETWEEN NOW() - interval '30 days' AND NOW() \
    UNION ALL SELECT mood FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '30 days' AND NOW()) AS fodder;", id);
  const lastMonth = res.rowsOfObjects();
  const data = {
    sleep_duration: Number(lastMonth[0].avg).toFixed(1),
    sleep_quality: Number(lastMonth[1].avg).toFixed(1),
    sports: Number(lastMonth[2].avg).toFixed(1),
    study: Number(lastMonth[3].avg).toFixed(1),
    eating_regularity: Number(lastMonth[4].avg).toFixed(1),
    eating_quality: Number(lastMonth[5].avg).toFixed(1),
    generic_mood: Number(lastMonth[6].avg).toFixed(1),
  };
  const res_trend = await executeCachedQuery(
    "SELECT AVG(sleep_duration) FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '60 days' AND NOW() - interval '30 days'  \
    UNION ALL SELECT AVG(sleep_quality) as quality FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '60 days' AND NOW() - interval '30 days'  \
    UNION ALL SELECT AVG(sport_hours) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '60 days' AND NOW() - interval '30 days'  \
    UNION ALL SELECT AVG(study_hours) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '60 days' AND NOW() - interval '30 days'  \
    UNION ALL SELECT AVG(eating_regularity) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '60 days' AND NOW() - interval '30 days'  \
    UNION ALL SELECT AVG(eating_quality) FROM evening WHERE user_id=$1 AND date BETWEEN NOW() - interval '60 days' AND NOW() - interval '30 days'  \
    UNION ALL SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening  WHERE user_id=$1 AND date BETWEEN NOW() - interval '60 days' AND NOW() - interval '30 days'  \
    UNION ALL SELECT mood FROM morning WHERE user_id=$1 AND date BETWEEN NOW() - interval '60 days' AND NOW() - interval '30 days' ) AS fodder;", id);
  const previousWeek = res_trend.rowsOfObjects();
  const trend_data = ["","","","","","",""];
  for (let i=0; i < 7; i++) {
    if (lastMonth[i].avg && previousWeek[i].avg) {
      if (Number(lastMonth[i].avg) > Number(previousWeek[i].avg)) {
        trend_data[i] = "+";
      } else if (Number(lastMonth[i].avg) < Number(previousWeek[i].avg)) {
        trend_data[i] = "-";
      } else {
        trend_data[i] = "=";
      }
    }
   
  }
  let trends = {
    sleep_duration: trend_data[0],
    sleep_quality: trend_data[1],
    sports: trend_data[2],
    study: trend_data[3],
    eating_regularity: trend_data[4],
    eating_quality: trend_data[5],
    generic_mood: trend_data[6],
  };

  const value = {
    data: data,
    trends: trends
  };

  if (Number(data.sleep_quality) === 0.0) {
    return null;
  } else {
    return value;
  }
};

const getDaysSummary = async(day) => {
  const res = await executeCachedQuery(
    "SELECT AVG(sleep_duration) FROM morning WHERE date=$1 \
    UNION ALL SELECT AVG(sleep_quality) as quality FROM morning WHERE date=$1 \
    UNION ALL SELECT AVG(sport_hours) FROM evening WHERE date=$1 \
    UNION ALL SELECT AVG(study_hours) FROM evening WHERE date=$1 \
    UNION ALL SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening WHERE date=$1 \
    UNION ALL SELECT mood FROM morning WHERE date=$1 ) AS fodder;", day);
  const dayobj = res.rowsOfObjects();
  const data = {
    sleep_duration: Number(dayobj[0].avg).toFixed(1),
    sleep_quality: Number(dayobj[1].avg).toFixed(1),
    sport_hours: Number(dayobj[2].avg).toFixed(1),
    study_hours: Number(dayobj[3].avg).toFixed(1),
    generic_mood: Number(dayobj[4].avg).toFixed(1),
  };
  if (Number(data.sleep_quality) === 0.0) {
    return "No data available.";
  } else {
    return data;
  }
}

const getMonth = async(MMmonth, id) => {
  const month = MMmonth.substring(0,5) + MMmonth.substring(5,7);
  const res = await executeCachedQuery(
    "SELECT AVG(sleep_duration) FROM morning WHERE user_id=$1 AND to_char(date, 'YYYY-MM')=$2 \
    UNION ALL SELECT AVG(sleep_quality) AS quality FROM morning WHERE user_id=$1 AND to_char(date, 'YYYY-MM')=$2 \
    UNION ALL SELECT AVG(sport_hours) FROM evening WHERE user_id=$1 AND to_char(date, 'YYYY-MM')=$2 \
    UNION ALL SELECT AVG(study_hours) FROM evening WHERE user_id=$1 AND to_char(date, 'YYYY-MM')=$2 \
    UNION ALL SELECT AVG(eating_regularity) FROM evening WHERE user_id=$1 AND to_char(date, 'YYYY-MM')=$2 \
    UNION ALL SELECT AVG(eating_quality) FROM evening WHERE user_id=$1 AND to_char(date, 'YYYY-MM')=$2 \
    UNION ALL SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening WHERE user_id=$1 AND to_char(date, 'YYYY-MM')=$2 \
    UNION ALL SELECT mood FROM morning WHERE user_id=$1 AND to_char(date, 'YYYY-MM')=$2) AS fodder ", id, month);
  const obj = res.rowsOfObjects();
  const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
  const monthName = months[Number(month.substring(5,7)) - 1];
  const data = {
    sleep_d: Number(obj[0].avg).toFixed(1),
    sleep_q: Number(obj[1].avg).toFixed(1),
    sport_h: Number(obj[2].avg).toFixed(1),
    study_h: Number(obj[3].avg).toFixed(1),
    eat_reg: Number(obj[4].avg).toFixed(1),
    eat_qua: Number(obj[5].avg).toFixed(1),
    mood: Number(obj[6].avg).toFixed(1),
    month: monthName,
    year: month.substring(0,4)
  };

  if (Number(data.sleep_q) === 0.0) {
    return null;
  } else {
    return data;
  }
}

const getWeek = async(WWweek, id) => {
  const week = WWweek.substring(0,5) + WWweek.substring(6,8);
  const res = await executeCachedQuery(
    "SELECT AVG(sleep_duration) FROM morning WHERE user_id=$1 AND to_char(date, 'IYYY-IW')=$2 \
    UNION ALL SELECT AVG(sleep_quality) AS quality FROM morning WHERE user_id=$1 AND to_char(date, 'IYYY-IW')=$2 \
    UNION ALL SELECT AVG(sport_hours) FROM evening WHERE user_id=$1 AND to_char(date, 'IYYY-IW')=$2 \
    UNION ALL SELECT AVG(study_hours) FROM evening WHERE user_id=$1 AND to_char(date, 'IYYY-IW')=$2 \
    UNION ALL SELECT AVG(eating_regularity) FROM evening WHERE user_id=$1 AND to_char(date, 'IYYY-IW')=$2 \
    UNION ALL SELECT AVG(eating_quality) FROM evening WHERE user_id=$1 AND to_char(date, 'IYYY-IW')=$2 \
    UNION ALL SELECT AVG(mood) AS mood FROM (SELECT mood FROM evening WHERE user_id=$1 AND to_char(date, 'IYYY-IW')=$2 \
    UNION ALL SELECT mood FROM morning WHERE user_id=$1 AND to_char(date, 'IYYY-IW')=$2) AS fodder ", id, week);
  const obj = res.rowsOfObjects();
  const data = {
    sleep_d: Number(obj[0].avg).toFixed(1),
    sleep_q: Number(obj[1].avg).toFixed(1),
    sport_h: Number(obj[2].avg).toFixed(1),
    study_h: Number(obj[3].avg).toFixed(1),
    eat_reg: Number(obj[4].avg).toFixed(1),
    eat_qua: Number(obj[5].avg).toFixed(1),
    mood: Number(obj[6].avg).toFixed(1),
    week: Number(week.substring(5,7)),
    year: Number(week.substring(0,4))
  };
  
  if (Number(data.sleep_q) === 0.0) {
    return null;
  } else {
    return data;
  }
}

export { getWeeklySummary, getMonthlySummary, getDaysSummary, getLastSevenDays, getMonth, getWeek };