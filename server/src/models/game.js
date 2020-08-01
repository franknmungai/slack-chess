const mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{
		// White player
		white: {
			type: String,
			required: true,
		},
		black: {
			type: String,
			required: true,
		},
		fen: {
			type: String,
			required: true,
		},
		time: {
			type: String,
			required: true,
		},
		gameID: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			},
		},
	}
);

const Game = mongoose.model('Game', schema);

module.exports = Game;
