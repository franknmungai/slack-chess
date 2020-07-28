import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Game from './Pages/Game';
import store from './store/redux';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Route path="/" exact component={Home} />
				<Route path="/game" component={Game} />
			</Router>
		</Provider>
	);
};

export default App;
