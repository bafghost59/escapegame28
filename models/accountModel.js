import bdd from '../config/bdd.js';

export const createAccount = async ({ login, password }) => {
  const addAccount = 'INSERT INTO account (login, password) VALUES (?, ?)';
  const [result] = await bdd.query(addAccount, [login, password]);
  return result;
}

export const getAllAccounts = async () => {
  const infoAccount = 'SELECT id_account, login FROM account';
  const [response] = await bdd.query(infoAccount);
  return response;
};


export const getAccountById = async (id_account) => {
  const accountById = 'SELECT id_account, login FROM account WHERE id_account = ?';
  const [response] = await bdd.query(accountById, [id_account]);
  return response[0] || null;
};

export const getAccountByLogin = async (login) => {
  const accountByLogin = 'SELECT * FROM account WHERE login = ?';
  const [response] = await bdd.query(accountByLogin, [login]);
  return response[0] || null;
};


export const updateAccount = async (id_account, { login, password }) => {
  const updateAccountById = `
    UPDATE account
    SET login = ?, password = ?
    WHERE id_account = ?
  `;
  const [response] = await bdd.query(updateAccountById, [login, password, id_account]);
  return response;              
};


export const deleteAccount = async (id_account) => {
  const accountDeleted = 'DELETE FROM account WHERE id_account = ?';
  const [result] = await bdd.query(accountDeleted, [id_account]);
  return result;
};

export default createAccount;