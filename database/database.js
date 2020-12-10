import { Client } from "../deps.js";
import { config } from "../config/config.js";

const getClient = () => {
  return new Client(config.database);
}

let cache = {};

const deleteCache = async() => {
  cache = {};
};

const executeQuery = async(query, ...args) => {
  const client = getClient();
  try {
    await client.connect();
    return await client.query(query, ...args);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

const executeCachedQuery = async(query, ...params) => {
  const key = query + params.reduce((acc, o) => acc + "-" + o, "");
  if (cache[key]) {
      return cache[key];
  }

  const res = await executeQuery(query, ...params);
  cache[key] = res;

  return res;
}

export { deleteCache, executeQuery, executeCachedQuery };