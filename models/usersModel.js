import bdd from "../config/bdd.js";

export const getAllUsers = async () => {
    const selectAllUsers = "SELECT id_user, lastname, firstname, email, adress, postal_code, city, role, created_at, account_id from users;";

    const [response] = await bdd.query(selectAllUsers);

    return response;
}

