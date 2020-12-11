import { Pool } from "../deps.js"

let config = {};

const CONCURRENT_CONNECTIONS = 5;
const DATABASE_URL = Deno.env.toObject().DATABASE_URL;

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database= new Pool({ hostname: Deno.env.get('PGHOST'),
    database: Deno.env.get('PGDATABASE'),
    user: Deno.env.get('PGDATABASE'),
    password: Deno.env.get('PGPASSWORD'),
    port: 5432 
  }, CONCURRENT_CONNECTIONS);
} else {
  config.database = new Pool({
    hostname: "your-database-hostname",
    database: "your-database",
    user: "your-database",
    password: "your-database-password",
    port: 5432
  }, CONCURRENT_CONNECTIONS);
}


export { config }; 