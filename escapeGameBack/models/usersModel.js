import bdd from "../config/bdd.js";

export const getAllUsers = async () => {
  const selectAllUsers =
    "SELECT id_user, lastname, firstname, email, adress, postal_code, city, role, created_at, account_id from users;";

  const [response] = await bdd.query(selectAllUsers);

  return response;
};

export const getInfoUserById = async (id_account) => {
  const selectInfoUser = `SELECT
      u.id_user,
      u.lastname,
      u.firstname,
      u.email,
      u.adress,
      u.postal_code,
      u.city,
      u.role,
      u.created_at,
      u.account_id,
      a.login,
      a.password
    FROM users AS u
    INNER JOIN account AS a
      ON u.account_id = a.id_account
    WHERE u.account_id = ?;`;

  const [response] = await bdd.query(selectInfoUser, [id_account]);

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

export const updateUser = async (
  id_user,
  {
    lastname,
    firstname,
    email,
    adress,
    postal_code,
    city,
    login,      
    password,   
  }
) => {
  const sqlUser = `
    UPDATE users
    SET lastname = ?, firstname = ?, email = ?, adress = ?, postal_code = ?, city = ?
    WHERE id_user = ?
  `;
  const paramsUser = [
    lastname,
    firstname,
    email,
    adress,
    postal_code,
    city,
    id_user,
  ];

  const [resultUser] = await bdd.query(sqlUser, paramsUser);

  if (resultUser.affectedRows === 0) {
    return { resultUser, resultAccount: null };
  }

  const [rows] = await bdd.query(
    "SELECT account_id FROM users WHERE id_user = ?",
    [id_user]
  );
  const account_id = rows[0]?.account_id;

  if (!account_id) {
    return { resultUser, resultAccount: null };
  }

  let sqlAccount = "UPDATE account SET login = ?";
  const paramsAccount = [login];

  if (password) {
    sqlAccount += ", password = ?";
    paramsAccount.push(password);
  }

  sqlAccount += " WHERE id_account = ?";
  paramsAccount.push(account_id);

  const [resultAccount] = await bdd.query(sqlAccount, paramsAccount);

  return { resultUser, resultAccount };
};


export const deleteUser = async (id_user) => {
  const sql = 'DELETE FROM users WHERE id_user = ?';
  const [result] = await bdd.query(sql, [id_user]);
  return result;
};

export default getAllUsers;
