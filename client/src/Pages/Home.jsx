import React, { useState, useEffect } from 'react';
import Join from '../components/Join';
import qs from 'query-string';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Tooltip from '@material-ui/core/Tooltip';
import TypedText from '../components/TypedText';
import HomeSvg from '../images/home.svg';
import '../styles/home.css';
import '../styles/home-bg.css';

const Home = (props) => {
	const [openDialog, setOpenDialog] = useState(false);

	const [invite, setInvited] = useState();

	useEffect(() => {
		const { id } = qs.parse(props.location.search);
		if (id) {
			setInvited(id);
		}
	}, [invite]);

	const icons = [
		{
			icon: <LibraryBooksIcon />,
			text: 'Learn how to play chess',
			link: 'https://www.instructables.com/id/Learning-to-Play-Chess/',
		},
		{
			icon: <GitHubIcon />,
			text: 'GitHub',
			link: 'https://github.com/franknmungai/slack-chess',
		},
		{ icon: <TwitterIcon />, text: 'Twitter', link: '' },
	];
	return (
		<div className="root__home bg-pattern">
			<h1 className="mainText">Slack Chess</h1>
			<div className="row center m-1">
				{icons.map((icon) => (
					<Tooltip
						title={icon.text}
						style={{ marginRight: '1rem' }}
						key={icon.icon}
					>
						<a href={icon.link} target="_blank" rel="noopener noreferrer">
							{icon.icon}
						</a>
					</Tooltip>
				))}
			</div>
			<main className="row space-even main_content">
				<object data={HomeSvg} width="350" height="350">
					slack chess
				</object>
				<div className="text-content m-1">
					<p className="m-1">Enjoy an online chess game with your friends</p>
					<TypedText text="Anywhere... Anytime" />

					<p className="m-1">
						Get started by creating a new game and inviting your friends
					</p>

					<div className="actions">
						<button
							className="btn new-btn m-1"
							onClick={() => setOpenDialog(true)}
						>
							{!invite ? 'New Game' : 'Join game'}
						</button>
						<a
							className="btn m-1 btn-link"
							href={icons[0].link}
							target="_blank"
							rel="noopener noreferrer"
						>
							How to play chess
						</a>
					</div>
				</div>
			</main>
			<Join
				open={openDialog || !!invite} //the dialog opens automatically when someone is invited
				onClose={() => {
					setOpenDialog(false);
				}}
				invite={invite} //an invite id
			/>
		</div>
	);
};

export default Home;
