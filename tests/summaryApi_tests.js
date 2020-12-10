import { app } from "../app.js";
import { superoak } from "../deps.js";

Deno.test("Function getSummary returns a JSON document with correct values taken from a test database", async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/summary")
        .expect({"last_7_days":{"sleep_duration":"7.0","sleep_quality":"4.0","sports":"0.3","study":"8.3","eating_regularity":"3.0","eating_quality":"3.7","generic_mood":"3.0"}});
});

Deno.test("Function getDaysSummary returns a JSON document with correct values taken from a test database", async () => {
    const testClient = await superoak(app);
    await testClient.get("/api/summary/2020/12/09")
        .expect({"day":{"sleep_duration":"8.0","sleep_quality":"5.0","sport_hours":"0.0","study_hours":"12.0","generic_mood":"3.0"}});
});