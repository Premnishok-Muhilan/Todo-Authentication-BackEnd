const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../utils/auth');
const userRouter = express.Router();

// define the endpoints
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', auth.verifyToken, userController.logout);

userRouter.get('/me', auth.verifyToken, userController.me); 

module.exports = userRouter;