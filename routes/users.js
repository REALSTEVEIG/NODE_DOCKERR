const express = require('express');

const { register, login, getUsers, getUser, updateUser, deleteUser } = require("../controllers/users")

const userRouter = express.Router();

const protect = require('../middleware/auth');

userRouter.route('/user/register').post(register)
userRouter.route('/user/login').post(login)
userRouter.route('/users').get(getUsers);
userRouter.route('/user/:id').get(getUser).put(protect, updateUser).delete(protect, deleteUser);

module.exports = userRouter;
