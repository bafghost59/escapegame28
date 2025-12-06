
import {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount,
  getAccountByLogin
} from '../models/accountModel.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


export const createAccountController = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: 'login et password sont requis' });
    }

   const mdpHash = bcrypt.hashSync(password, 10);
   console.log(mdpHash)
    const result = await createAccount({ login, mdpHash });
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

export const getAccountByLoginController = async (req, res) => {

    const { login } = req.body;
   
    try {
        const accountByLogin = await getAccountByLogin(login);
        console.log(accountByLogin);
        res.status(200).json(accountByLogin);
    } catch (error) {
    console.error("une erreur est survenue", error); 
    }
}

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

export const ConnexionAccount = async (req, res) => {
  const { login, password } = req.body; 
  try {
    const loginInDb = await getAccountByLogin(login);
    if (!loginInDb) {
      return res.status(401).json({error : "Utilisateur non trouvé"})
    }
    const isPasswordValid = await bcrypt.compare(password, loginInDb.password)
        if (!isPasswordValid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    const payload = {id: loginInDb.id_account}

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });  

return res.status(200).json({
      message: "Connexion réussie",
     loginInDbId: loginInDb.id_account,
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}

export const DeconnexionAccount = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la déconnexion" });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Déconnexion réussie" });
    })
}
