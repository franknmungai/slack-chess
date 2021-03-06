import React from 'react';
import '../styles/game-over.css';
import TypedText from './TypedText';
import wonsvg from '../images/win.svg';
import lostsvg from '../images/checkmated.svg';
import '../styles/join.css';

// const {
// 	in_checkmate,
// 	in_stalemate,
// 	in_threefold_repetition,
// 	in_insufficient_material,
// 	in_draw,
// } = props.gameOverState;

const GameOver = (props) => {
	let endClause = '';
	for (const [key, value] of Object.entries(props.gameOverState)) {
		if (value) {
			//if value is true
			endClause = 'It ended in a ' + key.replace('in_', '');
		}
	}

	const checkmated = props.checkmated && props.playerTurn === props.playerColor;

	const message = checkmated
		? "Sorry, You were checkmated. With some practice, you'll sure win next round"
		: `Awesome! Great game, you won. You are a chess master`;

	return (
		<div className="game-over-root">
			<h1>
				Game Over{' '}
				<span role="img" aria-label="game over">
					🙌
				</span>
			</h1>
			<p className="endClause">{endClause}</p>

			<TypedText text={message} speed={200} loop={false} />

			<div className="center">
				<object
					data={checkmated ? lostsvg : wonsvg}
					width={300}
					height={400}
					style={{ margin: '1rem auto' }}
				>
					game over
				</object>
				<a className="button play-again" href="/">
					Play again
				</a>
			</div>
		</div>
	);
};

export default GameOver;
