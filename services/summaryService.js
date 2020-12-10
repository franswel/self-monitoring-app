import { executeCachedQuery } from "../database/database.js";

const getWeeklySummary = async(id) => {

  let data = {
    sleep_duration: "No data",
    sleep_quality: "No data",
    sports: "No data",
    study: "No data",
    eating_regularity: "No data",
    eating_quality: "No data",
    generic_mood: "No data",
  };

  let trends = {
    sleep_duration: "",
    sleep_quality: "",
    sports: "",
    study: "",
    eating_regularity: "",
    eating_quality: "",
    generic_mood: "",
  };

  const sleep_d = await executeCachedQuery("SELECT AVG(sleep_duration) FROM (SELECT sleep_duration FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 7) AS fodder;", id);
  const sleep_d_trend = await executeCachedQuery("SELECT AVG(sleep_duration) FROM (SELECT sleep_duration FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 14) AS fodder;", id);
  if (sleep_d && sleep_d.rowCount > 0) {
    let sleep_d_avg = Number(sleep_d.rowsOfObjects()[0].avg);
    data.sleep_duration = sleep_d_avg.toFixed(1);
    if (sleep_d_trend && sleep_d_trend.rowCount > 0) {
      let sleep_d_avg_trend = Number(sleep_d_trend.rowsOfObjects()[0].avg);
      if (sleep_d_avg_trend > sleep_d_avg) {trends.sleep_duration = "-";} else if (sleep_d_avg_trend < sleep_d_avg) {trends.sleep_duration = "+"};
    };
  };

  const sleep_q = await executeCachedQuery("SELECT AVG(sleep_quality) FROM (SELECT sleep_quality FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 7) AS fodder;", id);
  const sleep_q_trend = await executeCachedQuery("SELECT AVG(sleep_quality) FROM (SELECT sleep_quality FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 14) AS fodder;", id);
  if (sleep_q && sleep_q.rowCount > 0) {
    let sleep_q_avg = Number(sleep_q.rowsOfObjects()[0].avg);
    data.sleep_quality = sleep_q_avg.toFixed(1);
    if (sleep_q_trend && sleep_q_trend.rowCount > 0) {
      let sleep_q_avg_trend = Number(sleep_q_trend.rowsOfObjects()[0].avg);
      if (sleep_q_avg_trend > sleep_q_avg) {trends.sleep_quality = "-";} else if (sleep_q_avg_trend < sleep_q_avg) {trends.sleep_quality = "+"};
    };
  };

  const sport = await executeCachedQuery("SELECT AVG(sport_hours) FROM (SELECT sport_hours FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 7) AS fodder;", id);
  const sport_trend = await executeCachedQuery("SELECT AVG(sport_hours) FROM (SELECT sport_hours FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 14) AS fodder;", id);
  if (sport && sport.rowCount > 0) {
    let sport_avg = Number(sport.rowsOfObjects()[0].avg);
    data.sports = sport_avg.toFixed(1);
    if (sport_trend && sport_trend.rowCount > 0) {
      let sport_trend_avg = Number(sport_trend.rowsOfObjects()[0].avg);
      if (sport_trend_avg > sport_avg) {trends.sports = "-";} else if (sport_trend_avg < sport_avg) {trends.sports = "+"};
    };
  };

  const studying = await executeCachedQuery("SELECT AVG(study_hours) FROM (SELECT study_hours FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 7) AS fodder;", id);
  const studying_trend = await executeCachedQuery("SELECT AVG(study_hours) FROM (SELECT study_hours FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 14) AS fodder;", id);
  if (studying && sport.rowCount > 0) {
    let studying_avg = Number(studying.rowsOfObjects()[0].avg);
    data.study = studying_avg.toFixed(1);
    if (studying_trend && studying_trend.rowCount > 0) {
      let studying_trend_avg = Number(studying_trend.rowsOfObjects()[0].avg);
      if (studying_trend_avg > studying_avg) {trends.study = "-";} else if (studying_trend_avg < studying_avg) {trends.study = "+"};
    };
  };

  const eat_reg = await executeCachedQuery("SELECT AVG(eating_regularity) FROM (SELECT eating_regularity FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 7) AS fodder;", id);
  const eat_reg_trend = await executeCachedQuery("SELECT AVG(eating_regularity) FROM (SELECT eating_regularity FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 14) AS fodder;", id);
  if (eat_reg && eat_reg.rowCount > 0) {
    let eat_reg_avg = Number(eat_reg.rowsOfObjects()[0].avg);
    data.eating_regularity = eat_reg_avg.toFixed(1);
    if (eat_reg_trend && eat_reg_trend.rowCount > 0) {
      let eat_reg_trend_avg = Number(eat_reg_trend.rowsOfObjects()[0].avg);
      if (eat_reg_trend_avg > eat_reg_avg) {trends.eating_regularity = "-";} else if (eat_reg_trend_avg < eat_reg_avg) {trends.eating_regularity = "+"};
    };
  };

  const eat_q = await executeCachedQuery("SELECT AVG(eating_quality) FROM (SELECT eating_quality FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 7) AS fodder;", id);
  const eat_q_trend = await executeCachedQuery("SELECT AVG(eating_quality) FROM (SELECT eating_quality FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 14) AS fodder;", id);
  if (eat_q && eat_q.rowCount > 0) {
    let eat_q_avg = Number(eat_q.rowsOfObjects()[0].avg);
    data.eating_quality = eat_q_avg.toFixed(1);
    if (eat_q_trend && eat_q_trend.rowCount > 0) {
      let eat_q_trend_avg = Number(eat_q_trend.rowsOfObjects()[0].avg);
      if (eat_q_trend_avg > eat_q_avg) {trends.eating_quality = "-";} else if (eat_q_trend_avg < eat_q_avg) {trends.eating_quality = "+"};
    };
  };

  const mood_m = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 7) AS fodder;", id);
  const mood_m_trend = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 14) AS fodder;", id);
  const mood_e = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 7) AS fodder;", id);
  const mood_e_trend = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 14) AS fodder;", id);
  if ((mood_m && mood_m.rowCount > 0) || (mood_e && mood_e.rowCount > 0)) {
    let mood_avg = ((Number(mood_m.rowsOfObjects()[0].avg) + Number(mood_e.rowsOfObjects()[0].avg)) / 2);
    data.generic_mood = mood_avg.toFixed(1);
    if (mood_m_trend && mood_e_trend) {
      let mood_trend_avg = ((Number(mood_m_trend.rowsOfObjects()[0].avg) + Number(mood_e_trend.rowsOfObjects()[0].avg)) / 2);
      if (mood_trend_avg > mood_avg) {trends.generic_mood = "-";} else if (mood_trend_avg < mood_avg) {trends.generic_mood = "+"};
    }
  };

  const value = {
    data: data,
    trends: trends
  };

  return value;
};

const getLastSevenDays = async() => {

  let data = {
    sleep_duration: "No data",
    sleep_quality: "No data",
    sports: "No data",
    study: "No data",
    eating_regularity: "No data",
    eating_quality: "No data",
    generic_mood: "No data",
  };

  const sleep_d = await executeCachedQuery("SELECT AVG(sleep_duration) FROM (SELECT sleep_duration FROM morning ORDER BY date DESC LIMIT 7) AS fodder;");
  if (sleep_d && sleep_d.rowCount > 0) {
    let sleep_d_avg = Number(sleep_d.rowsOfObjects()[0].avg);
    data.sleep_duration = sleep_d_avg.toFixed(1);
  };

  const sleep_q = await executeCachedQuery("SELECT AVG(sleep_quality) FROM (SELECT sleep_quality FROM morning ORDER BY date DESC LIMIT 7) AS fodder;");
  if (sleep_q && sleep_q.rowCount > 0) {
    let sleep_q_avg = Number(sleep_q.rowsOfObjects()[0].avg);
    data.sleep_quality = sleep_q_avg.toFixed(1);
  };

  const sport = await executeCachedQuery("SELECT AVG(sport_hours) FROM (SELECT sport_hours FROM evening ORDER BY date DESC LIMIT 7) AS fodder;");
  if (sport && sport.rowCount > 0) {
    let sport_avg = Number(sport.rowsOfObjects()[0].avg);
    data.sports = sport_avg.toFixed(1);
  };

  const studying = await executeCachedQuery("SELECT AVG(study_hours) FROM (SELECT study_hours FROM evening ORDER BY date DESC LIMIT 7) AS fodder;");
  if (studying && sport.rowCount > 0) {
    let studying_avg = Number(studying.rowsOfObjects()[0].avg);
    data.study = studying_avg.toFixed(1);
  };

  const eat_reg = await executeCachedQuery("SELECT AVG(eating_regularity) FROM (SELECT eating_regularity FROM evening ORDER BY date DESC LIMIT 7) AS fodder;");
  if (eat_reg && eat_reg.rowCount > 0) {
    let eat_reg_avg = Number(eat_reg.rowsOfObjects()[0].avg);
    data.eating_regularity = eat_reg_avg.toFixed(1);
  };

  const eat_q = await executeCachedQuery("SELECT AVG(eating_quality) FROM (SELECT eating_quality FROM evening ORDER BY date DESC LIMIT 7) AS fodder;");
  if (eat_q && eat_q.rowCount > 0) {
    let eat_q_avg = Number(eat_q.rowsOfObjects()[0].avg);
    data.eating_quality = eat_q_avg.toFixed(1);
  };

  const mood_m = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM morning ORDER BY date DESC LIMIT 7) AS fodder;");
  const mood_e = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM evening ORDER BY date DESC LIMIT 7) AS fodder;");
  if ((mood_m && mood_m.rowCount > 0) || (mood_e && mood_e.rowCount > 0)) {
    let mood_avg = ((Number(mood_m.rowsOfObjects()[0].avg) + Number(mood_e.rowsOfObjects()[0].avg)) / 2);
    data.generic_mood = mood_avg.toFixed(1);
  };

  return data;
};

const getMonthlySummary = async(id) => {

    let data = {
      sleep_duration: "No data",
      sleep_quality: "No data",
      sports: "No data",
      study: "No data",
      eating_regularity: "No data",
      eating_quality: "No data",
      generic_mood: "No data",
    };
  
    let trends = {
      sleep_duration: "",
      sleep_quality: "",
      sports: "",
      study: "",
      eating_regularity: "",
      eating_quality: "",
      generic_mood: "",
    };
  
    const sleep_d = await executeCachedQuery("SELECT AVG(sleep_duration) FROM (SELECT sleep_duration FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 30) AS fodder;", id);
    const sleep_d_trend = await executeCachedQuery("SELECT AVG(sleep_duration) FROM (SELECT sleep_duration FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 60) AS fodder;", id);
    if (sleep_d && sleep_d.rowCount > 0) {
      let sleep_d_avg = Number(sleep_d.rowsOfObjects()[0].avg);
      data.sleep_duration = sleep_d_avg.toFixed(1);
      if (sleep_d_trend && sleep_d_trend.rowCount > 0) {
        let sleep_d_avg_trend = Number(sleep_d_trend.rowsOfObjects()[0].avg);
        if (sleep_d_avg_trend > sleep_d_avg) {trends.sleep_duration = "-";} else if (sleep_d_avg_trend < sleep_d_avg) {trends.sleep_duration = "+"};
      };
    };
  
    const sleep_q = await executeCachedQuery("SELECT AVG(sleep_quality) FROM (SELECT sleep_quality FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 30) AS fodder;", id);
    const sleep_q_trend = await executeCachedQuery("SELECT AVG(sleep_quality) FROM (SELECT sleep_quality FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 60) AS fodder;", id);
    if (sleep_q && sleep_q.rowCount > 0) {
      let sleep_q_avg = Number(sleep_q.rowsOfObjects()[0].avg);
      data.sleep_quality = sleep_q_avg.toFixed(1);
      if (sleep_q_trend && sleep_q_trend.rowCount > 0) {
        let sleep_q_avg_trend = Number(sleep_q_trend.rowsOfObjects()[0].avg);
        if (sleep_q_avg_trend > sleep_q_avg) {trends.sleep_quality = "-";} else if (sleep_q_avg_trend < sleep_q_avg) {trends.sleep_quality = "+"};
      };
    };
  
    const sport = await executeCachedQuery("SELECT AVG(sport_hours) FROM (SELECT sport_hours FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 30) AS fodder;", id);
    const sport_trend = await executeCachedQuery("SELECT AVG(sport_hours) FROM (SELECT sport_hours FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 60) AS fodder;", id);
    if (sport && sport.rowCount > 0) {
      let sport_avg = Number(sport.rowsOfObjects()[0].avg);
      data.sports = sport_avg.toFixed(1);
      if (sport_trend && sport_trend.rowCount > 0) {
        let sport_trend_avg = Number(sport_trend.rowsOfObjects()[0].avg);
        if (sport_trend_avg > sport_avg) {trends.sports = "-";} else if (sport_trend_avg < sport_avg) {trends.sports = "+"};
      };
    };
  
    const studying = await executeCachedQuery("SELECT AVG(study_hours) FROM (SELECT study_hours FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 30) AS fodder;", id);
    const studying_trend = await executeCachedQuery("SELECT AVG(study_hours) FROM (SELECT study_hours FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 60) AS fodder;", id);
    if (studying && sport.rowCount > 0) {
      let studying_avg = Number(studying.rowsOfObjects()[0].avg);
      data.study = studying_avg.toFixed(1);
      if (studying_trend && studying_trend.rowCount > 0) {
        let studying_trend_avg = Number(studying_trend.rowsOfObjects()[0].avg);
        if (studying_trend_avg > studying_avg) {trends.study = "-";} else if (studying_trend_avg < studying_avg) {trends.study = "+"};
      };
    };
  
    const eat_reg = await executeCachedQuery("SELECT AVG(eating_regularity) FROM (SELECT eating_regularity FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 30) AS fodder;", id);
    const eat_reg_trend = await executeCachedQuery("SELECT AVG(eating_regularity) FROM (SELECT eating_regularity FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 60) AS fodder;", id);
    if (eat_reg && eat_reg.rowCount > 0) {
      let eat_reg_avg = Number(eat_reg.rowsOfObjects()[0].avg);
      data.eating_regularity = eat_reg_avg.toFixed(1);
      if (eat_reg_trend && eat_reg_trend.rowCount > 0) {
        let eat_reg_trend_avg = Number(eat_reg_trend.rowsOfObjects()[0].avg);
        if (eat_reg_trend_avg > eat_reg_avg) {trends.eating_regularity = "-";} else if (eat_reg_trend_avg < eat_reg_avg) {trends.eating_regularity = "+"};
      };
    };
  
    const eat_q = await executeCachedQuery("SELECT AVG(eating_quality) FROM (SELECT eating_quality FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 30) AS fodder;", id);
    const eat_q_trend = await executeCachedQuery("SELECT AVG(eating_quality) FROM (SELECT eating_quality FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 60) AS fodder;", id);
    if (eat_q && eat_q.rowCount > 0) {
      let eat_q_avg = Number(eat_q.rowsOfObjects()[0].avg);
      data.eating_quality = eat_q_avg.toFixed(1);
      if (eat_q_trend && eat_q_trend.rowCount > 0) {
        let eat_q_trend_avg = Number(eat_q_trend.rowsOfObjects()[0].avg);
        if (eat_q_trend_avg > eat_q_avg) {trends.eating_quality = "-";} else if (eat_q_trend_avg < eat_q_avg) {trends.eating_quality = "+"};
      };
    };
  
    const mood_m = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 30) AS fodder;", id);
    const mood_m_trend = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM morning WHERE user_id=$1 ORDER BY date DESC LIMIT 60) AS fodder;", id);
    const mood_e = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 30) AS fodder;", id);
    const mood_e_trend = await executeCachedQuery("SELECT AVG(mood) FROM (SELECT mood FROM evening WHERE user_id=$1 ORDER BY date DESC LIMIT 60) AS fodder;", id);
    if ((mood_m && mood_m.rowCount > 0) || (mood_e && mood_e.rowCount > 0)) {
      let mood_avg = ((Number(mood_m.rowsOfObjects()[0].avg) + Number(mood_e.rowsOfObjects()[0].avg)) / 2);
      data.generic_mood = mood_avg.toFixed(1);
      if (mood_m_trend && mood_e_trend) {
        let mood_trend_avg = ((Number(mood_m_trend.rowsOfObjects()[0].avg) + Number(mood_e_trend.rowsOfObjects()[0].avg)) / 2);
        if (mood_trend_avg > mood_avg) {trends.generic_mood = "-";} else if (mood_trend_avg < mood_avg) {trends.generic_mood = "+"};
      }
    };
  
    const value = {
      data: data,
      trends: trends
    };
  
    return value;
}

const getDaysSummary = async(day) => {

  const data = {
      sleep_duration: "-",
      sleep_quality: "-",
      sport_hours: "-",
      study_hours: "-",
      generic_mood: "-",
  };

  const avg_mood = await executeCachedQuery(
      "SELECT AVG(mood) FROM \
      (SELECT morning.mood FROM morning, evening WHERE morning.date=$1 AND evening.date=$1 \
      UNION ALL \
      SELECT evening.mood FROM evening, morning WHERE evening.date=$1 AND morning.date=$1) AS fodder \
      ;", day);
  
  if (avg_mood && avg_mood.rowCount > 0) {data.generic_mood = Number(avg_mood.rowsOfObjects()[0].avg).toFixed(1);};

  const avg_sleep_dur = await executeCachedQuery("SELECT AVG(sleep_duration) FROM morning WHERE date=$1;", day);
  if (avg_sleep_dur && avg_sleep_dur.rowCount > 0) {data.sleep_duration = Number(avg_sleep_dur.rowsOfObjects()[0].avg).toFixed(1);};

  const avg_sleep_qua = await executeCachedQuery("SELECT AVG(sleep_quality) FROM morning WHERE date=$1;", day);
  if (avg_sleep_qua && avg_sleep_qua.rowCount > 0) {data.sleep_quality = Number(avg_sleep_qua.rowsOfObjects()[0].avg).toFixed(1);};

  const avg_sports = await executeCachedQuery("SELECT AVG(sport_hours) FROM evening WHERE date=$1;", day);
  if (avg_sports && avg_sports.rowCount > 0) {data.sport_hours = Number(avg_sports.rowsOfObjects()[0].avg).toFixed(1);};

  const avg_study = await executeCachedQuery("SELECT AVG(study_hours) FROM evening WHERE date=$1;", day);
  if (avg_study && avg_study.rowCount > 0) {data.study_hours = Number(avg_study.rowsOfObjects()[0].avg).toFixed(1);};

  return data;
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
    sleep_d: Number(obj[0].avg),
    sleep_q: Number(obj[1].avg),
    sport_h: Number(obj[2].avg),
    study_h: Number(obj[3].avg),
    eat_reg: Number(obj[4].avg),
    eat_qua: Number(obj[5].avg),
    mood: Number(obj[6].avg),
    month: monthName,
    year: month.substring(0,4)
  };

  if (data.sleep_q === 0) {
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
    sleep_d: Number(obj[0].avg),
    sleep_q: Number(obj[1].avg),
    sport_h: Number(obj[2].avg),
    study_h: Number(obj[3].avg),
    eat_reg: Number(obj[4].avg),
    eat_qua: Number(obj[5].avg),
    mood: Number(obj[6].avg),
    week: Number(week.substring(5,7)),
    year: Number(week.substring(0,4))
  };
  
  if (data.sleep_q === 0) {
    return null;
  } else {
    return data;
  }
}










export { getWeeklySummary, getMonthlySummary, getDaysSummary, getLastSevenDays, getMonth, getWeek };