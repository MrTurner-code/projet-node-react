const express = require('express');
const router = express.Router();
const characterController = require('./controller');

router.post('/', characterController.newCharacter);
router.get('/',characterController.getCharacters);

module.exports = router;