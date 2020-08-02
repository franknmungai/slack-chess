const express = require('express');
const Game = require('../models/game');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validate-request');
const router = express.Router();

const validators = [
	body('white').notEmpty().withMessage('Missing white'),
	body('black').notEmpty().withMessage('Missing black'),
	body('fen').notEmpty().withMessage('Missing FEN'),
	body('gameID').notEmpty().withMessage('Provide a valid game id'),
];
// Save a game
router.post('/api/game', validators, validateRequest, async (req, res) => {
	req.body.time = new Date().toISOString();

	try {
		const existingGame = await Game.findOne({ gameID: req.body.gameID });
		if (!existingGame) {
			const game = new Game(req.body);
			await game.save();
		} else {
			//updating an already saved game
			existingGame.set(req.body);
			await existingGame.save();
		}
		res.send({ message: 'Game was saved successfully' });
	} catch (error) {
		res
			.status(500)
			.send({ error: [{ message: 'Could not save game', error }] });
	}
});

module.exports = { saveGameHandler: router };
