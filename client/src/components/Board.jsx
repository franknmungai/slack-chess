import React from 'react';
import '../styles/game.css';

const Board = (props) => {
	return <div className="board">{props.children}</div>;
};

export default Board;
