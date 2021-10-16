const { query, body } = require('express-validator');
const {
	validator: { chainBuilder, commonChain },
} = require('utils');

const password = body('password')
	.exists()
	.withMessage('Field required.')
	.bail()
	.notEmpty()
	.withMessage('Empty field value.')
	.isLength({ min: 8, max: 32 })
	.withMessage('Field value must be an min 8 characters and max 32 characters.');

const login = chainBuilder([commonChain.emailRequired(body('email')), password]);

module.exports = {
	login,
};
