import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import getPieceImage from '../images/getPieceImages';

//* Movable piece of the game

const Piece = (props) => {
	const element = useRef();
	const nameExpression = `${
		props.color
	}${props.piece.toString().toUpperCase()}`; //e.g bK -- black king

	return (
		<img
			width="75%"
			height="75%"
			draggable="true" //opponent pieces are not editable. Out of turn players have editable=false
			src={getPieceImage(nameExpression)}
			alt=""
			ref={element}
			onDragStart={(event) => {
				props.onDragStart(props.piece, props.pos); //Pass data to main component
				setTimeout(
					() => (element.current.style.display = 'none'), //hide element
					5
				);
			}}
			onDrop={() => {
				// props.onDrop(props.)
			}}
			onDragEnd={() => (element.current.style.display = 'inline')}
		/>
	);
};

Piece.propTypes = {
	piece: PropTypes.string.isRequired, //the piece the cell currently holds e.g b(bishop)
	color: PropTypes.string.isRequired, //The color or piece either b or w
	pos: PropTypes.string, // e1
};

export default Piece;
