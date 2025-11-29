
import {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
} from '../models/accountModel.js';


export const createAccountController = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: 'login et password sont requis' });
    }

    const result = await createAccount({ login, password });
    res.status(201).json({
      message: 'Compte créé',
      id_account: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


export const getAllAccountsController = async (req, res) => {
  try {
    const accounts = await getAllAccounts();
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const getAccountByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await getAccountById(id);

    if (!account) {
      return res.status(404).json({ message: 'Compte non trouvé' });
    }

    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const updateAccountController = async (req, res) => {
  try {
    const { id } = req.params;
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: 'login et password sont requis' });
    }

    const result = await updateAccount(id, { login, password });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Compte non trouvé' });
    }

    res.json({ message: 'Compte mis à jour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteAccountController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteAccount(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Compte non trouvé' });
    }

    res.json({ message: 'Compte supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
