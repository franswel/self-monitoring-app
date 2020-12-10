import { assertEquals } from "../deps.js";
import { getWeek, getMonth, getDaysSummary } from "../services/userService.js";

Deno.test("Function getWeek returns null if the week sent as param does not contain any data", async() => {
    assertEquals(await getWeek('2020-W10', 1), null);
});

Deno.test("Function getWeek returns correct week data averages if the week containts data", async() => {
    const data = await getWeek('2020-W50', 1);
    assertEquals(data.mood, 3.0);
});

Deno.test("Function getMonth returns null if the month sent as param does not contain any data", async() => {
    assertEquals(await getMonth('2020-W10', 1), null);
});

Deno.test("Function getMonth returns correct month data averages if the month containts data", async() => {
    const data = await getMonth('2020-12', 1);
    assertEquals(data.mood, 3.0);
});

Deno.test("Function getDaysSummary returns correct data from test database", async() => {
    const data = await getDaysSummary('2020-12-01');
    assertEquals(data, {"day":{"sleep_duration":"0.0","sleep_quality":"0.0","sport_hours":"0.0","study_hours":"0.0","generic_mood":"0.0"}});
});