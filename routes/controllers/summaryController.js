import { getWeeklySummary, getMonthlySummary, getWeek, getMonth } from "../../services/summaryService.js";

const weeklySummary = async({render, session, request}) => {
  const body = request.body();
  const params = await body.value;

  const week = params.get('week');
  const user = await session.get('user');
  render('weeklySummary.ejs', { data: await getWeek(week, user.id), user: user });
};
  
const monthlySummary = async({render, session, request}) => {
  const body = request.body();
  const params = await body.value;

  const month = params.get('month');
  const user = await session.get('user');
  render('monthlySummary.ejs', { data: await getMonth(month, user.id), user: user });
};

const showSummarySelection = async({render, session}) => {
  const user = await session.get('user');
  render('summarySelection.ejs', {w: await getWeeklySummary(user.id), m: await getMonthlySummary(user.id), user: user });
}

export { weeklySummary, monthlySummary, showSummarySelection }