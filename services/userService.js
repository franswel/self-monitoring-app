import { deleteCache, executeQuery, executeCachedQuery } from "../database/database.js";

const checkEmail = async(email) => {
    return (await executeQuery("SELECT * FROM app_users WHERE email = $1", email));
};

const registerAccount = async(email, hash) => {
    await deleteCache();
    await executeQuery("INSERT INTO app_users (email, password) VALUES ($1, $2);", email, hash);
};

const getUser = async(email) => {
    return (await executeCachedQuery("SELECT * FROM app_users WHERE email = $1;", email));
};

export { checkEmail, registerAccount, getUser };