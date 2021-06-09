const express = require('express');
const router = express.Router();
const characterController = require('./controller');
const {verifySession } = require('../api/verifySession')

router.post('/',verifySession, characterController.newCharacter);
router.get('/',verifySession,characterController.getCharacters);

module.exports = router;