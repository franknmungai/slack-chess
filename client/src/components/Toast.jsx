import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const Toast = (props) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={props.open}
			onClose={props.onClose}
			autoHideDuration={3000}
			message={props.message}
		/>
	);
};

export default Toast;
