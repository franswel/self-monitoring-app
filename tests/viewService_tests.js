import { assertEquals } from "../deps.js";
import { getMessage, removeLastIfExists, isSubmitted, getDate } from "../services/viewService.js";

Deno.test("Function getMessage returns correct data from test database (curDate='2020-12-09')", async() => {
    const data = await getMessage(1);
    const myData = {
        mood_today: 3.0,
        mood_yesterday: 3.0,
        message: "Things are looking bright today!",
    };
    assertEquals(data, myData);
});

Deno.test("Function removeIfLastExists does not remove anything if a non-existing table is given as a parameter", async() => {
    assertEquals(await removeLastIfExists('2020-12-09', 'non-existing-table', 1), null);
});

Deno.test("Function isSubmitted outputs a correct data object depending on if todays data has been already submitted", async() => {
    const myData = {
        morning: "Done!",
        evening: "Done!",
    };
    assertEquals(await isSubmitted(1), myData);
});

Deno.test("Function getDate returns correct date (curDate='2020-12-09')", async() => {
    assertEquals(await getDate(), '2020-12-09');
});