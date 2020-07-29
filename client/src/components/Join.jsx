import '../styles/join.css';
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import formImage from '../images/form-image.jpg';
import { useHistory } from 'react-router-dom';

// Join form
const Join = (props) => {
	const [name, setName] = useState('');
	const [gameId, setgameId] = useState('');
	const [sentInvite, setSentInvite] = useState(false);
	const mobile = useMediaQuery('(max-width: 500px)');
	const { invite, open, onClose } = props;

	useEffect(() => {
		//some kind of id from an invite link
		if (invite) {
			setgameId(invite);
			setSentInvite(true);
		} else {
			const id = Math.random().toString().replace('0.', '');
			setgameId(id);
		}
	}, [invite]);

	const history = useHistory();
	const onSubmitHandler = (event) => {
		event.preventDefault();
		if (name && sentInvite) {
			history.push(`/game?name=${name}&id=${gameId}`);
		}
	};

	const shareText = `Hello. Join me for a round of chess on Slack Chess at https://slack-chess.com?id=${gameId}`;
	const subject = 'Slack Chess Game Invite';

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="form-dialog-title"
			// className="joinOuterContainer"
			fullWidth
			maxWidth="lg"
			onBackdropClick={onClose}
		>
			<Grid
				container
				justify="space-between"
				alignItems="center"
				style={{ overflowY: `${mobile ? 'auto' : 'hidden'}` }}
			>
				<Grid item xs="auto" sm="auto" md={6} lg={6}>
					<img
						src={formImage}
						height={`${mobile ? '25%' : '100%'}`}
						width="100%"
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={6}>
					<h1 className="text-center">
						{!invite ? 'Create a new game' : 'Join me'}
					</h1>
					<form onSubmit={onSubmitHandler} className="form">
						<div>
							<input
								type="text"
								className="joinInput"
								placeholder="Your player name"
								onChange={({ target }) => setName(target.value)}
								required
								value={name}
							/>
						</div>
						<div>
							<span className="id-field mt-20" contentEditable={false}>
								GAME ID: {gameId}
							</span>
						</div>
						<hr className="hairline" />
						{!invite ? (
							<ShareButtons
								onClick={() => setSentInvite(true)}
								subject={subject}
								shareText={shareText}
							/>
						) : (
							<h3 className="text-center">
								Hey, care to join me for my chess game? 😄
							</h3>
						)}
						<button type="submit" className="button mt-20">
							{props.invite ? 'JOIN' : 'CREATE'}
						</button>
					</form>
				</Grid>
			</Grid>
		</Dialog>
	);
};

const ShareButtons = (props) => {
	const { onClick, shareText, subject } = props;
	return (
		<React.Fragment>
			<h2>Invite your friend over</h2>
			<div className="row center">
				<a
					href={`https://api.whatsapp.com/send?text=${shareText}`}
					target="_blank"
					onClick={onClick}
				>
					<img src="https://img.icons8.com/color/48/000000/whatsapp.png" />
				</a>
				<a
					href={`mailto:?Subject=${encodeURIComponent(
						subject
					)}&body=${encodeURI(shareText)}`}
					onClick={onClick}
				>
					<img src="https://img.icons8.com/fluent/48/000000/gmail.png" />
				</a>
				<a
					href={`https://twitter.com/messages/compose?recipient_id=&text=${shareText}`}
					class="twitter-dm-button"
					target="_blank"
					onClick={onClick}
				>
					<img src="https://img.icons8.com/fluent/48/000000/twitter.png" />
				</a>
			</div>
		</React.Fragment>
	);
};

export default Join;
