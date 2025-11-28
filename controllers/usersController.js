import * as usersModel from "../models/usersModel.js"

import bcrypt  from "bcryptjs"; 

export const getUsers = async (req, res) => {
    try {
        const users = await usersModel.getAllUsers(); 
        res.status(200).json(users);
    } catch (error) {
        console.error("une erreur est survenue", error);
    }
}

