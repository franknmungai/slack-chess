import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import GameReducer from './gameReducer';

const rootReducer = combineReducers({
	game: GameReducer,
});
const store = createStore(rootReducer, composeWithDevTools());

export default store;
