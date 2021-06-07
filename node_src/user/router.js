const express = require('express');
const router = express.Router();
const userController = require('./controller');
const bcrypt = require('bcrypt')


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/check', userController.check)
router.get("/", userController.getUsers);
router.delete("/:id", userController.deleteUser);
module.exports=router;