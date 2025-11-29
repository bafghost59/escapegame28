import bdd from "../config/bdd.js";

export const getAllUsers = async () => {
  const selectAllUsers =
    "SELECT id_user, lastname, firstname, email, adress, postal_code, city, role, created_at, account_id from users;";

  const [response] = await bdd.query(selectAllUsers);

  return response;
};

export const getInfoUser = async () => {
  const selectInfoUser = "SELECT lastname, firstname, email, role  from users;";

  const [response] = await bdd.query(selectInfoUser);

  return response;
};

export const getUserById = async (id) => {
  const selectUserById = "SELECT * FROM users WHERE id_user = ?";

  const [response] = await bdd.query(selectUserById, [id]);

  return response;
};

export const createUser = async ({
  lastname,
  firstname,
  email,
  adress,
  postal_code,
  city,
  role = "user",
  created_at,
  account_id,
}) => {
  const addUser = `
    INSERT INTO users (lastname, firstname, email, adress, postal_code, city, role, created_at, account_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    lastname,
    firstname,
    email,
    adress,
    postal_code,
    city,
    role,
    created_at,
    account_id,
  ];

  const [response] = await bdd.query(addUser, params);
  return response;
};

export const updateUser = async (id_user, {
  lastname,
  firstname,
  email,
  adress,
  postal_code,
  city,
  role,
}) => {
  const updateUserById = `
    UPDATE users
    SET lastname = ?, firstname = ?, email = ?, adress = ?, postal_code = ?, city = ?, role = ?
    WHERE id_user = ?
  `;

  const params = [
    lastname,
    firstname,
    email,
    adress,
    postal_code,
    city,
    role,
    id_user,
  ];

  const [result] = await bdd.query(updateUserById, params);
  return result;
};

export const deleteUser = async (id_user) => {
  const sql = 'DELETE FROM users WHERE id_user = ?';
  const [result] = await bdd.query(sql, [id_user]);
  return result;
};

export default getAllUsers;
