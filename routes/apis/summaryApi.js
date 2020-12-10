import * as summaryService from "../../services/summaryService.js";

const getSummary = async({response}) => {
    response.body = { last_7_days: await summaryService.getLastSevenDays() };
};

const getDaysSummary = async({response, params}) => {
    const year = params.year;
    const month = params.month;
    const day = params.day;
    response.body = { day: await summaryService.getDaysSummary(year+"-"+month+"-"+day) };
};

export { getSummary, getDaysSummary };