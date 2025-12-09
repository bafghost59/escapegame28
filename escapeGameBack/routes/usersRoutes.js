import * as usersController from '../controllers/usersController.js'
import verifyToken from '../middlewares/checkToken.js';

import express from "express";

const router = express.Router();

router.get('/AllUsers', usersController.getUsers);

router.get("/infoUserById/:id_account", usersController.getUserInfoByAccountId);

router.get('/userById/:id', verifyToken, usersController.getUserById);

router.post('/addUser', usersController.registerUser);

router.put('/updateUser/:id', usersController.updateUserController);

router.delete('/deleteUser/:id', verifyToken, usersController.deleteUserController);

export default router;

