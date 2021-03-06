import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import getPieceImage from '../images/getPieceImages';

//* Movable piece of the game

const Piece = (props) => {
	const element = useRef();
	const nameExpression = `${
		props.color
	}${props.piece.toString().toUpperCase()}`; //e.g bK -- black king

	const dragStartHandler = (event) => {
		props.onDragStart(props.piece, props.pos); //Pass data to main component
		setTimeout(
			() => (element.current.style.display = 'none'), //hide element
			0
		);
	};
	const dragEndHandler = () => (element.current.style.display = 'inline');
	const touchStartHandler = (event) => {
		event.preventDefault(); //prevent scroll
		props.onDragStart(props.piece, props.pos);
	};
	return (
		<img
			width="75%"
			height="75%"
			draggable={props.draggable}
			src={getPieceImage(nameExpression)}
			alt=""
			ref={element}
			onDragStart={dragStartHandler}
			onDragEnd={dragEndHandler}
			onTouchStart={touchStartHandler}
			onTouchEnd={dragEndHandler}
			onTouchMove={dragEndHandler}
			onTouchMoveCapture={dragEndHandler}
		/>
	);
};

Piece.propTypes = {
	piece: PropTypes.string.isRequired, //the piece the cell currently holds e.g b(bishop)
	color: PropTypes.string.isRequired, //The color or piece either b or w
	pos: PropTypes.string, // e1
};

export default Piece;
