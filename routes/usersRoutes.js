import * as usersController from '../controllers/usersController.js'
import verifyToken from '../middlewares/checkToken.js';

import express from "express";

const router = express.Router();

router.get('/AllUsers', usersController.getUsers);

router.get('/infoUser', usersController.getInfoUser);

router.get('/userById/:id', verifyToken, usersController.getUserById);

router.post('/addUser', verifyToken, usersController.registerUser);

router.put('/updateUser/:id', verifyToken, usersController.updateUserController);

router.delete('/deleteUser/:id', verifyToken, usersController.deleteUserController);

export default router;

