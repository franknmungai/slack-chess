const express = require('express');

const router = express.Router();

// Save a game
router.post('/game', (req, res) => {
	res.send({ message: 'Game was saved successfully' });
});

module.exports = { saveGameHandler: router };
