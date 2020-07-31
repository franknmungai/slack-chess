import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import ShareIcon from '@material-ui/icons/Share';
import { ShareButtons } from './Join';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import qs from 'qs';
import '../styles/game.css';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		// marginBottom: '-0.65rem',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		background: ' rgba(0,0,0,0.9)',
		padding: '0.2rem',
		width: '100vw',
	},
	toolbar: {
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
	playerSpan: {
		color: '#fff',
		fontSize: '14px',
		margin: '0.4rem',
		padding: '0.4rem',
	},
}));

const GameBar = (props) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [popperOpen, setPopperOpen] = useState(false);
	const { playerColor, opponentName, disconnected } = props;
	const opponentColor = playerColor === 'w' ? 'Black' : 'White';
	const color = playerColor === 'w' ? 'White' : 'Black';
	const name = opponentName.slice(0, 2).toUpperCase();
	const openPopper = (event) => {
		setAnchorEl(event.currentTarget);
		setPopperOpen((state) => !state);
	};
	const mobile = useMediaQuery('(max-width: 500px)');
	return (
		<div className={classes.root}>
			<AppBar
				position="static"
				className={classes.appBar}
				style={{ width: mobile ? '150vw' : '100vw' }}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<Avatar style={{ background: deepOrange[500] }}>You</Avatar>
						<div>
							<span className="online" />
							<span className={classes.playerSpan}>{color}</span>
						</div>
					</IconButton>
					<h3 style={{ fontFamily: 'cursive', marginTop: '10px' }}>
						Slack Chess
					</h3>
					<IconButton edge="end">
						{name ? (
							<>
								<Avatar style={{ background: deepPurple[500] }}>{name}</Avatar>
								<div>
									<span className={disconnected ? 'offline' : 'online'} />
									<span className={classes.playerSpan}>{opponentColor}</span>
								</div>
							</>
						) : (
							<>
								<Tooltip title="Invite your opponent" color="primary">
									<ShareIcon style={{ color: '#fff' }} onClick={openPopper} />
								</Tooltip>
								{/* <ClickAwayListener onClickAway={() => setPopperOpen(false)}> */}
								<Popper
									open={popperOpen}
									anchorEl={anchorEl}
									placement="left-end"
									transition
								>
									{({ TransitionProps }) => (
										<Fade {...TransitionProps} timeout={350}>
											<Paper>
												<ShareButtons
													onClick={() => {}}
													subject="Slack Chess Game Invite"
													shareText={`Hello. Join me for a round of chess on Slack Chess at https://slack-chess.com?id=${`qs.parse(location.search).id`}`}
													headingSmall
												/>
											</Paper>
										</Fade>
									)}
								</Popper>
								{/* </ClickAwayListener> */}
							</>
						)}
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default GameBar;
