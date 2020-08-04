import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Piece from './Piece';

const Cell = (props) => {
	const divCell = useRef();
	const isLastOpponentMove = props.lastOpponentMove.includes(props.pos);

	// Check turn and color to see if a piece should be draggable. not draggable if, 1 its not your turn, 2 its not your color
	const draggable =
		props.color === props.playerColor && props.playerTurn === props.color;
	//
	const alertCheck =
		props.inCheck && props.piece.toLowerCase() === 'k' && draggable;

	//Get the position of the cell we drop at
	const dropHandler = () => {
		props.onDrop(props.pos);
		console.log('OnDrop', props.pos);
	};

	return (
		<div
			className={`piece ${props.light ? 'light' : 'dark'} ${
				props.isPossibleMove ? 'possible-move' : ''
			} ${isLastOpponentMove ? 'last_opponent_move' : ''} ${
				alertCheck ? 'check' : ''
			}`}
			ref={divCell}
			onDragOver={(event) => event.preventDefault()}
			onDrop={dropHandler}
			onTouchEnd={() => {
				dropHandler();
				console.log('TouchEnd', props.pos);
			}}
			onTouchMove={() => {}}
		>
			<span>
				<Piece
					piece={props.piece}
					color={props.color}
					pos={props.pos}
					onDragStart={(piece, pos) => props.onDragStart(piece, pos)}
					draggable={draggable}
				/>
			</span>
		</div>
	);
};

Cell.propTypes = {
	light: PropTypes.bool.isRequired, //defines whether the square is black or white
	piece: PropTypes.string.isRequired, //the piece the cell currently holds e.g b(bishop)
	color: PropTypes.string.isRequired, //The color or piece either b or w
	pos: PropTypes.string.isRequired, // e1
	onDragStart: PropTypes.func.isRequired,
	onDrop: PropTypes.func.isRequired,
	lastOpponentMove: PropTypes.array,
	playerColor: PropTypes.string,
	playerTurn: PropTypes.string,
};

export default Cell;
