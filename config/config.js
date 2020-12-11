import { Pool } from "../deps.js"

let config = {};

const CONCURRENT_CONNECTIONS = 5;
const DATABASE_URL = Deno.env.toObject().DATABASE_URL;

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = new Pool(DATABASE_URL, CONCURRENT_CONNECTIONS);
}

export { config }; 