import * as usersModel from "../models/usersModel.js";
import { createAccount } from '../models/accountModel.js';
import { createUser } from '../models/usersModel.js';
import { updateUser } from '../models/usersModel.js';
import { deleteUser } from '../models/usersModel.js';

import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await usersModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("une erreur est survenue", error);
  }
};

export const getInfoUser = async (req, res) => {
  try {
    const infoUser = await usersModel.getInfoUser();
    res.status(200).json(infoUser);
  } catch (error) {
    console.error("Une erreur est survenue", error);
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const userById = await usersModel.getUserById(id);
    res.status(200).json(userById);
  } catch (error) {
    console.error("une erreur est survenue", error);
  }
};

export const registerUser = async (req, res) => {
    console.log("registerUser body:", req.body);
  try {
    const {
      login,
      password,
      lastname,
      firstname,
      email,
      adress,
      postal_code,
      city,
    } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const accountResult = await createAccount({
      login,
      password: hashedPassword,
    });
    const account_id = accountResult.insertId;
    const created_at = new Date();
    await createUser({
      lastname,
      firstname,
      email,
      adress,
      postal_code,
      city,
      role: "user",
      created_at,
      account_id,
    });

    res.status(201).json({ message: "Utilisateur et compte créés" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      lastname,
      firstname,
      email,
      adress,
      postal_code,
      city,
      role,
    } = req.body;

    const result = await updateUser(id, {
      lastname,
      firstname,
      email,
      adress,
      postal_code,
      city,
      role,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur mis à jour' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteUser(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
