import { assertEquals } from "../deps.js";
import { checkEmail } from "../services/userService.js";

Deno.test("Function checkEmail returns correct user from test database", async() => {
    const data = await checkEmail('test1@gmail.com').rowsOfObjects();
    assertEquals(data[0].id, 1);
});