import React from 'react';
import '../App.css';

const Board = (props) => {
	return <div className="board">{props.children}</div>;
};

export default Board;
