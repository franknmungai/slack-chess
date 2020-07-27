import React, { useState, useEffect, useRef } from 'react';
import Join from '../components/Join';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Tooltip from '@material-ui/core/Tooltip';
import HomeSvg from '../images/home.svg';
import '../styles/home.css';
import '../styles/home-bg.css';

const Home = () => {
	const textContent = useRef(Array.from('Anywhere... Anytime'));
	const [text, setText] = useState('');

	useEffect(() => {
		const timer = setInterval(() => {
			const lastCharIndex = text.length - 1;
			console.log(lastCharIndex);

			if (lastCharIndex === -1) {
				//text is empty
				setText(textContent.current[0]);
			} else if (lastCharIndex + 1 === textContent.current.length) {
				setText('');
			} else {
				setText((text) => text.concat(textContent.current[lastCharIndex + 1]));
			}
		}, 500);

		return () => clearInterval(timer);
	}, [text]);

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
					<Tooltip title={icon.text} style={{ marginRight: '1rem' }}>
						<a href={icon.link} target="_blank">
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
					<p className="m-1 type-writer">{text}|</p>

					<p className="m-1">
						Get started by creating a new game and inviting your friends
					</p>

					<div className="actions">
						<button className="btn new-btn m-1">New Game</button>
						<button className="btn m-1 btn-link">How to play chess</button>
					</div>
				</div>
			</main>
			{/* <Join /> */}
		</div>
	);
};

export default Home;
