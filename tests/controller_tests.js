import { app } from "../app.js";
import { superoak } from "../deps.js";

Deno.test("Function showLoginForm renders correctly", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/login")
        .expect(200);
});

Deno.test("Function showRegistrationForm renders correctly", async () => {
    const testClient = await superoak(app);
    await testClient.get("/auth/register")
        .expect(200);
});

Deno.test("Function frontPage renders correctly", async () => {
    const testClient = await superoak(app);
    await testClient.get("/")
        .expect(200);
});