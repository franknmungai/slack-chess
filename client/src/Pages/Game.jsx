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
import '../styles/game.css';
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
import AppBar from '../components/AppBar';
import Toast from '../components/Toast';

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

	const [playerColor, setPlayerColor] = useState('');

	// Game controls
	const [opponent, setOpponent] = useState('');
	const [playerTurn, setPlayerTurn] = useState('w');
	const [toast, setToast] = useState('');
	const [lastOpponentMove, setLastOpponentMove] = useState({});
	const [disconnected, setDisconnected] = useState(false);

	useEffect(() => {
		const { id, name } = qs.parse(props.location.search);
		socket.emit('join', { name, game: id }, ({ error, color }) => {
			// we get an error or a color if the player was added successfully
			if (error) setToast(error);

			if (color) {
				const message = `You have been assigned to ${
					color === 'w' ? 'white' : 'black'
				}`;
				setToast(message);
				// Set the player color
				setPlayerColor(color);
			}
		});
	}, []);

	useEffect(() => {
		socket.on('message', (message) => {
			setToast(message.text);
			if (message.opponent) {
				console.log(message.opponent);
				setOpponent(message.opponent.name);
			}
		});
	}, []);

	useEffect(() => {
		socket.on('opponentJoin', (message) => {
			setToast(message.text);
			setOpponent(message.name);
		});
	}, []);

	useEffect(() => {
		socket.on('opponentMove', ({ piece, fromPos, toPos }) => {
			const data = chess.move(`${fromPos}-${toPos}`, { sloppy: true });
			console.log('Move data ', data);
			if (!data) return;

			//if the move was successful
			setFen(chess.fen()); //update the state with our new fen notation
			setLastOpponentMove({ fromPos, toPos });
			setPlayerTurn(chess.turn()); //update the turn
			if (data.captured) {
				setCapturedPieces((state) => [
					...state,
					{
						player: data.color === 'w' ? 'b' : 'w', //w (color) who got captured
						captured: data.captured, //B  (piece)
					},
				]);
			}
			setToast(`Now it's your turn ${qs.parse(props.location.search).name}`);
			gameOverCheck();
		});
	}, [chess]);

	useEffect(() => {
		socket.on('OpponentLeft', () => setDisconnected(true));
	}, []);

	const onDragStartHandler = (piece, pos) => {
		//sets the currenty playing piece and position
		currentPlaying.current = piece;
		fromPos.current = pos;

		const valid = highlightPossibleMoves(chess, pos);
		setPossibleMoves(valid);
	};

	const onDropHandler = (pos) => {
		toPos.current = pos; //set the position we want to move to
		const data = makeMove(
			chess,
			currentPlaying.current,
			fromPos.current,
			toPos.current
		);
		if (!data) return; //invalid move
		const { captured, player } = data;
		setFen(chess.fen()); //update the state with our new fen notation
		setPossibleMoves([]);
		setLastOpponentMove({});
		setPlayerTurn(chess.turn());
		setToast('');
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
			lastOpponentMove={Object.values(lastOpponentMove)}
			playerColor={playerColor} //to ensure you can only move your piece colors
			playerTurn={playerTurn}
			inCheck={chess.in_check()}
		/>
	));

	return (
		<>
			<AppBar
				opponentName={opponent}
				playerColor={playerColor}
				disconnected={disconnected}
			/>
			{gameOver ? (
				<div className="game">
					<Captured color="b" pieces={capturedPieces} />
					<Board>{markup}</Board>
					<Captured color="w" pieces={capturedPieces} />
					<Toast open={!!toast} message={toast} onClose={() => setToast('')} />
				</div>
			) : (
				<GameOver
					gameOverState={gameOverState}
					checkmated={chess.in_checkmate()}
					playerColor={playerColor}
					playerTurn={playerTurn}
				/>
			)}
		</>
	);
};

export default App;
