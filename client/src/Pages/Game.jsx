import React, { useState, useRef, useReducer, useEffect } from 'react';
import Chess from 'chess.js';
import io from 'socket.io-client';
import qs from 'query-string';
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
import NavBar from '../components/NavBar';

const SOCKET_SERVER = 'localhost:4000';
let socket = io(SOCKET_SERVER);

const startingFen =
	// localStorage.fen ||
	'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const App = (props) => {
	//The FEN representation of the board. Stored in state

	const [fen, setFen] = useState(startingFen);
	const [possibleMoves, setPossibleMoves] = useState([]);
	const [capturedPieces, setCapturedPieces] = useState([]);
	const [gameOver, setGameOver] = useState(false);

	const { current: chess } = useRef(new Chess(fen));
	const currentPlaying = useRef();
	const fromPos = useRef();
	const toPos = useRef();

	const board = createBoard(createFenArray(fen)); // [{name: 'a8', piece: 'r'},{},{}]

	const [gameOverState, dispatch] = useReducer(gameOverReducer, initialState);

	const playerColor = useRef();

	useEffect(() => {
		const { id, name } = qs.parse(props.location.search);
		socket.emit('join', { name, game: id }, ({ error, color }) => {
			// /we get an error or a color if the player was added successfully

			if (error) alert(error);

			if (color) {
				const message = `You have been assigned to ${
					color === 'w' ? 'white' : 'black'
				}`;

				alert(message);

				// Set the turn
				playerColor.current = color;
			}
		});
	}, []);

	useEffect(() => {
		socket.on('message', (message) => {
			console.log(message);
		});
	}, []);

	useEffect(() => {
		socket.on('opponentMove', ({ piece, fromPos, toPos }) => {
			console.log({ piece, fromPos, toPos });
			console.log('opponentMove', chess.turn());
			const data = chess.move(`${fromPos}-${toPos}`, { sloppy: true });
			console.log('Move data ', data);
			setFen(chess.fen()); //update the state with our new fen notation
			console.log('opponentMove', chess.turn());
			// if (data.captured) {
			// 	setCapturedPieces((state) => [
			// 		...state,
			// 		{
			// 			player, //w (color)
			// 			captured: data.captured, //B  (piece)
			// 		},
			// 	]);
			// }

			gameOverCheck();
		});
	}, []);

	const onDragStartHandler = (piece, pos) => {
		if (chess.turn() !== playerColor.current) {
			// return;
		}

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

		// emit socket event with details about the move
		socket.emit('move', {
			piece: currentPlaying.current,
			fromPos: fromPos.current,
			toPos: toPos.current,
		});
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
			<NavBar />
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
