const express = require('express');
const router = express.Router();
const userController = require('./controller');
const bcrypt = require('bcrypt')
const {verifySession} = require('../api/verifySession')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/check',verifySession, userController.check);
router.post('/logout',userController.logout);
router.get("/", userController.getUsers);
router.delete("/:id", userController.deleteUser);
module.exports=router;