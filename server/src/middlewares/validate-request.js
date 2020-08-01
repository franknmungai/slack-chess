const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
	const errors = validationResult(req);
	const serializedErrors = errors.array().map((error) => ({
		message: error.msg,
		field: error.param,
	}));
	if (!errors.isEmpty()) {
		return res.status(400).send(serializedErrors);
	}

	next();
};

module.exports = validateRequest;
