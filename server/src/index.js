const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const cors = require('cors');
const { addPlayer, getPlayerColor } = require('./players');

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;

// Event types --> Message(sends messages to players about moves and turns), Move(sends a FEN code of the opponents move)
io.on('connection', (socket) => {
	socket.on('join', ({ name, game }, callback) => {
		console.log(`${name} has joined the game ${game}`);
		const player = { name, game, id: socket.id };
		const { error, player } = addPlayer(player);

		if (error) {
			callback(error); //game is full error
		}

		//send welcome message to player1
		socket.emit('message', {
			text: `Hello ${player.name}, Welcome to the game`,
		});

		// Tell player2 that player1 has joined the game
		socket.broadcast.to(player.game).emit('message', {
			text: `${name} has joined the game. `,
		});

		// Start the game
		io.to(game).emit('message', {
			text: `Let's start the game. White (${
				getPlayerColor('w', game).name
			}) goes first`,
		});
	});
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
