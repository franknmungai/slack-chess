import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

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
	},
	toolbar: {
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
}));

const GameBar = (props) => {
	const classes = useStyles();
	const { playerColor, opponentName } = props;
	const opponentColor = playerColor === 'w' ? 'Black' : 'White';
	const color = playerColor === 'w' ? 'White' : 'Black';
	const name = opponentName.slice(0, 2).toUpperCase();

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<Avatar style={{ background: deepOrange[500] }}>You</Avatar>
						<span className="color" style={{ color: '#fff', fontSize: '14px' }}>
							{color}
						</span>
					</IconButton>
					{/* <h2 style={{ fontFamily: 'arial' }}>Slack Chess</h2> */}
					<IconButton edge="end">
						<Avatar style={{ background: deepPurple[500] }}>{name}</Avatar>
						<span className="color" style={{ color: '#fff', fontSize: '14px' }}>
							{opponentColor}
						</span>
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default GameBar;
