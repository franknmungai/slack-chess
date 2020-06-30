import React from 'react';

const GameOver = ({
	in_checkmate,
	in_stalemate,
	in_threefold_repetition,
	in_insufficient_material,
	in_draw,
}) => {
	//TODO: ADD APPROPRIATE EMOJI

	// let message = `Game Over. `;
	return (
		<div>
			<h1>Game Over</h1>
		</div>
	);
};

export default GameOver;
