const express = require('express');
const Game = require('../models/game');
const router = express.Router();

router.get('/api/game/:gameID', async (req, res) => {
	const { gameID } = req.params;

	const game = await Game.findOne({ gameID });
	if (!game) {
		return res.status(400).send([{ message: 'Could not find game' }]);
	}

	return res.send(game);
});
module.exports = { fetchGameHandler: router };
