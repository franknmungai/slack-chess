// Name of the player and id of the game
const players = [{ id: '', name: '', color: '', game: '' }];

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

// Returns a specific player in a game
const getPlayerColor = (color, game) =>
	players.find((pl) => pl.game === game && pl.color === color);

const getPlayersInGame = (game) => players.filter((pl) => pl.game === game);

module.exports = { addPlayer, getPlayerColor };
