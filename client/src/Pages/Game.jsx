import React, { useState, useRef, useReducer } from 'react';
import Chess from 'chess.js';
import Board from '../components/Board';
import {
	lightSquare,
	createBoard,
	createFenArray,
	makeMove,
	highlightPossibleMoves,
} from '../functions/game';
import '../App.css';
import Cell from '../components/Cell';
import GameOver from '../components/GameOver';
import {
	gameOverReducer,
	initialState,
	IN_CHECKMATE,
	IN_STALEMATE,
	IN_THREEFOLD_REPETITION,
	IN_INSUFFICIENT_MATERIAL,
	IN_DRAW,
} from '../store/AppReducer';
import Captured from '../components/Captured';

const App = (props) => {
	//The FEN representation of the board. Stored in state
	const startingFen =
		localStorage.fen ||
		'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
	const [fen, setFen] = useState(startingFen);

	const [possibleMoves, setPossibleMoves] = useState([]);
	const [capturedPieces, setCapturedPieces] = useState([]);

	const [gameOver, setGameOver] = useState(false);

	const chess = new Chess(fen);
	const currentPlaying = useRef();
	const fromPos = useRef();
	const toPos = useRef();

	const board = createBoard(createFenArray(fen)); // [{name: 'a8', piece: 'r'},{},{}]

	const [gameOverState, dispatch] = useReducer(gameOverReducer, initialState);

	const onDragStartHandler = (piece, pos) => {
		//sets the currenty playing piece and position
		currentPlaying.current = piece;
		fromPos.current = pos;

		const valid = highlightPossibleMoves(chess, pos);
		setPossibleMoves(valid);
	};

	const onDropHandler = (pos) => {
		toPos.current = pos; //set the position we want to move to
		const { captured, player } = makeMove(
			chess,
			currentPlaying.current,
			fromPos.current,
			toPos.current
		);
		setFen(chess.fen()); //update the state with our new fen notation
		setPossibleMoves([]);

		if (captured) {
			setCapturedPieces(
				capturedPieces.concat({
					player, //w (color)
					captured, //B  (piece)
				})
			);
		}

		gameOverCheck();

		//Todo: emit socket event
	};

	const gameOverCheck = () => {
		if (chess.game_over()) setGameOver(chess.game_over());
		if (chess.in_checkmate()) dispatch({ type: IN_CHECKMATE });
		if (chess.in_stalemate()) dispatch({ type: IN_STALEMATE });
		if (chess.insufficient_material())
			dispatch({ type: IN_INSUFFICIENT_MATERIAL });
		if (chess.in_threefold_repetition())
			dispatch({ type: IN_THREEFOLD_REPETITION });
		if (chess.in_draw()) dispatch({ type: IN_DRAW });
	};
	// ? Creating the chess cells
	let markup = board.map((cell, index) => (
		<Cell
			piece={cell.piece} //b
			pos={cell.name} //a1
			key={index}
			isPossibleMove={possibleMoves.includes(cell.name)}
			light={lightSquare(index + 1)} //true
			color={
				isNaN(+cell.piece)
					? cell.piece === cell.piece.toUpperCase()
						? 'w'
						: 'b'
					: 'e'
			}
			onDragStart={(piece, pos) => {
				//position drag starts
				onDragStartHandler(piece, pos);
			}}
			onDrop={(pos) => {
				//position player drops piece
				onDropHandler(pos);
			}}
		/>
	));

	return (
		<>
			{!gameOver ? (
				<div className="game">
					<Captured color="b" pieces={capturedPieces} />
					<Board>{markup}</Board>
					<Captured color="w" pieces={capturedPieces} />
				</div>
			) : (
				<GameOver gameOverState={gameOverState} />
			)}
		</>
	);
};

export default App;
