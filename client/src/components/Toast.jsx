import React from 'react';
import PropTypes from 'prop-types';
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

Toast.prototype = {
	message: PropTypes.string.isRequired,
	open: PropTypes.bool,
};
export default Toast;
