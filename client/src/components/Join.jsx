// Join form
import './css/Join.css';
import React, { useState, useEffect } from 'react';
import qs from 'query-string';

const Join = (props) => {
	const [name, setName] = useState('');
	const [room, setRoom] = useState('');

	useEffect(() => {
		// const { search } = props.location;
		// const { id } = qs.parse(search);
		// if (id) props.history.push(`/game=${id}`);
		//save game id incase of query string
	}, []);

	const onSubmitHandler = (event) => {
		event.preventDefault();
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
							placeholder="Room"
							onChange={({ target }) => setRoom(target.value)}
							required
							value={room}
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
