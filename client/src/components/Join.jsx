// Join form
import '../styles/join.css';
import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import { useHistory } from 'react-router-dom';

const Join = (props) => {
	const [name, setName] = useState('');
	const [gameId, setgameId] = useState('');

	useEffect(() => {
		// const { search } = props.location;
		// const { id } = qs.parse(search);
		// if (id) props.history.push(`/game=${id}`);
		//save game id incase of query string
	}, []);

	const history = useHistory();
	const onSubmitHandler = (event) => {
		event.preventDefault();
		if (name && gameId) {
			history.push(`/game?name=${name}&id=${gameId}`);
		}
	};

	return (
		<form onSubmit={onSubmitHandler}>
			<div className="joinOuterContainer">
				<div className="joinInnerContainer">
					<h1 className="heading">Join</h1>
					<div>
						<input
							type="text"
							className="joinInput"
							placeholder="Name"
							onChange={({ target }) => setName(target.value)}
							required
							value={name}
						/>
					</div>
					<div>
						<input
							type="text"
							className="joinInput mt-20"
							placeholder="Game ID"
							onChange={({ target }) => setgameId(target.value)}
							required
							value={gameId}
						/>
					</div>

					<button type="submit" className="button mt-20">
						Sign up
					</button>
				</div>
			</div>
		</form>
	);
};

export default Join;
