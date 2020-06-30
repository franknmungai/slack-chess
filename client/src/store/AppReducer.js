export const IN_CHECKMATE = 'IN_CHECKMATE';
export const IN_STALEMATE = 'IN_STALEMATE';
export const IN_THREEFOLD_REPETITION = 'IN_THREEFOLD_REPETITION';
export const IN_INSUFFICIENT_MATERIAL = 'IN_INSUFFICIENT_MATERIAL';
export const IN_DRAW = 'IN_DRAW';

export const initialState = {
	in_checkmate: false,
	in_stalemate: false,
	in_threefold_repetition: false,
	in_insufficient_material: false,
	in_draw: false
};

export const gameOverReducer = (state, action) => {
	switch (action.type) {
		case IN_CHECKMATE:
			return { ...state, in_checkmate: true };
		case IN_STALEMATE:
			return { ...state, in_stalemate: true };
		case IN_THREEFOLD_REPETITION:
			return { ...state, in_threefold_repetition: true };
		case IN_INSUFFICIENT_MATERIAL:
			return { ...state, in_insufficient_material: true };
		case IN_DRAW:
			return { ...state, in_draw: true };
		default:
			return state;
	}
};
