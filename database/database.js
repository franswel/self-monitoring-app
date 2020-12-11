import { config } from "../config/config.js";

let cache = {};

const deleteCache = async() => {
  cache = {};
};

const executeQuery = async(query, ...params) => {
  const client = await config.database.connect();
  try {
      return await client.query(query, ...params);
  } catch (e) {
      console.log(e);  
  } finally {
      client.release();
  }
  
  return null;
};

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