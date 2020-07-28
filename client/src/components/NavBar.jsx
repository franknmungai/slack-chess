import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

const NavBar = () => {
	return (
		<Toolbar>
			<IconButton edge="start">
				<Avatar style={{ background: 'orange' }}>You</Avatar>
			</IconButton>
			<IconButton edge="end">
				<Avatar style={{ background: 'red' }}>Player 2</Avatar>
			</IconButton>
		</Toolbar>
	);
};

export default NavBar;
