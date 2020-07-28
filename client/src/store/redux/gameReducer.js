import { Types } from './gameActions';
const initialState = {
	currentPlayerName: '',
	opponentName: '',
	currentPlayerTurn: '',
	savedGameFEN: '',
};

const GameReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.SET_CURRENT_PLAYER_NAME:
			return { ...state, currentPlayerName: action.name };
		case Types.SET_OPPONENET_NAME:
			return { ...state, opponentName: action.name };
		case Types.SET_CURRENT_PLAYER_TURN:
			return { ...state, currentPlayerTurn: action.turn };
		case Types.SET_SAVED_GAME_FEN:
			return { ...state, savedGameFEN: action.turn };
		default:
			return { ...state };
	}
};

export default GameReducer;
