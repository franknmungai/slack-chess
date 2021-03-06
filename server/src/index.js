const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {
	addPlayer,
	getPlayerColor,
	getPlayersInGame,
	removePlayer,
	getPlayer,
} = require('./players');

const { saveGameHandler } = require('./routes/save-game');
const { fetchGameHandler } = require('./routes/fetch-game');
const app = express();

app.use(cors());
app.use(express.json());
// app.use(saveGameHandler);
// app.use(fetchGameHandler);
app.get('/', (req, res) => res.send({ name: 'Slack Chess' }));

const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT;

// Event types --> Message(sends messages to players about moves and turns), Move(sends the opponents move)
io.on('connection', (socket) => {
	socket.on('join', ({ name, game }, callback) => {
		console.log(`${name} has joined the game ${game}`);
		const player = { name, game, id: socket.id };
		const { error, _player } = addPlayer(player);

		if (error) {
			callback({ error }); //game is full error
			return;
		}

		socket.join(game);
		callback({ color: _player.color }); //send the color back to the client

		//send welcome message to player1, and also send the opponent player's data
		socket.emit('message', {
			text: `Hello ${player.name}, Welcome to the game`,
			opponent: getPlayersInGame(game).find((pl) => pl.id !== _player.id),
		});

		// Tell player2 that player1 has joined the game.
		socket.broadcast.to(player.game).emit('opponentJoin', {
			text: `${name} has joined the game. `,
			name: player.name,
		});

		// Start the game once its full
		if (getPlayersInGame(game).length === 2) {
			io.to(game).emit('message', {
				text: `Let's start the game. White (${
					getPlayerColor('w', game).name
				}) goes first`,
			});
		}
	});

	socket.on('move', ({ piece, fromPos, toPos }) => {
		const player = getPlayer(socket.id) || {};

		socket.broadcast
			.to(player.game)
			.emit('opponentMove', { piece, toPos, fromPos });
	});

	socket.on('disconnect', () => {
		const player = removePlayer(socket.id);

		if (player) {
			io.to(player.game).emit('message', {
				text: `${player.name} has left the game.`,
			});
			socket.broadcast.to(player.game).emit('OpponentLeft');
			console.log(`${player.name} has left the game ${player.game}`);
		}
	});
});

const start = async () => {
	// await mongoose.connect(`${process.env.MONGODB_URL}`, {
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true,
	// 	useCreateIndex: true,
	// });
	server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
