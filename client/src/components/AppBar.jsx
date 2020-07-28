import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Avatar } from '@material-ui/core';

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
	},
	toolbar: {
		alignItems: 'flex-start',
		justifyContent: 'space-between',
	},
}));

const GameBar = () => {
	const classes = useStyles();

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
						<Typography variant="caption">Name</Typography>
						<Typography variant="caption">Color</Typography>
					</IconButton>
					{/* <h2 style={{ fontFamily: 'arial' }}>Slack Chess</h2> */}
					<IconButton edge="end">
						<Avatar style={{ background: deepPurple[500] }}>You</Avatar>
						<Typography variant="caption">Pl2 Name</Typography>
						<Typography variant="caption">Color</Typography>
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default GameBar;
