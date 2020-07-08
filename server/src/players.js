// Name of the player and id of the game
const players = [
	// { id: '', name: '', color: '', game: '' }
];

const addPlayer = (player) => {
	const { id, name, game } = player; //id: the id of the game

	const gameIsFull = getPlayersInGame(game).length >= 2;
	if (gameIsFull) {
		return { error: 'Sorry, this game is full.' };
	}

	// Shuffle the array of colors to randomly assign 'b' or 'w'
	const colors = ['b', 'w'];
	let [playerColor, otherColor] = colors.sort(() => Math.random() - 0.5);

	const color = getPlayerColor(playerColor, game) ? otherColor : playerColor;
	const _player = { ...player, color };

	players.push(_player);

	return { player: _player };
};

// Returns a specific player in a game, returns the black or white in a game
const getPlayerColor = (color, game) => {
	return players.find((pl) => pl.game === game && pl.color === color);
};

// Get all the players in a game
const getPlayersInGame = (game) => players.filter((pl) => pl.game === game);

const removePlayer = (id) => {
	const playerIndex = players.find((pl) => pl.id === id);

	if (playerIndex !== -1) {
		const player = players.splice(playerIndex, 1)[0];
		return player;
	}
};

const getPlayer = (id) => {
	return players.find((pl) => pl.id === id);
};

module.exports = {
	addPlayer,
	getPlayerColor,
	getPlayersInGame,
	removePlayer,
	getPlayer,
	players,
};
