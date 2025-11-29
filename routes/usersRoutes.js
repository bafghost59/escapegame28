import * as usersController from '../controllers/usersController.js'

import express from "express";

const router = express.Router();

router.get('/AllUsers', usersController.getUsers);

router.get('/infoUser', usersController.getInfoUser);

router.get('/userById/:id', usersController.getUserById);

router.post('/addUser', usersController.registerUser);

router.put('/updateUser/:id', usersController.updateUserController);

router.delete('/deleteUser/:id', usersController.deleteUserController);

export default router;

