import * as usersController from '../controllers/usersController.js'

import express from "express";

const router = express.Router();

router.get('/AllUsers', usersController.getUsers);

export default router;

