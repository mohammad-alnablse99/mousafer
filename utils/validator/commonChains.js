const { param, query } = require('express-validator');

const mongoId = (chain) =>
	chain.notEmpty().withMessage('Empty field value.').isMongoId().withMessage('Field value must be a valid id');

const integer = (chain) =>
	chain
		.notEmpty()
		.withMessage('Empty field value.')
		.isInt({ gt: 0 })
		.withMessage('Field value must be an integer with value > 0.')
		.toInt();

const string = (chain) =>
	chain.notEmpty().withMessage('Empty field value.').isString().withMessage('Field value must be a string.');

const boolean = (chain) =>
	chain
		.notEmpty()
		.withMessage('Empty field value.')
		.isBoolean()
		.withMessage('Field value must be a boolean.')
		.toBoolean();

const array = (chain) =>
	chain.notEmpty().withMessage('Empty field value.').isArray().withMessage('Field value must be an array.');

const date = (chain) =>
	chain
		.notEmpty()
		.withMessage('Empty field value.')
		.isISO8601()
		.withMessage('Field value must be a date in ISO8601 format')
		.toDate();

const isIn = (chain, array) =>
	chain
		.notEmpty()
		.withMessage('Empty field value.')
		.isIn(array)
		.withMessage(`Field value must be one of [ ${array.toString()} ].`);

const email = (chain) =>
	chain
		.notEmpty()
		.withMessage('Empty field value.')
		.isEmail()
		.withMessage('Field value must be a valid email format');

module.exports = {
	params: {
		id: mongoId(param('id').exists().withMessage('Field required.').bail()),
	},
	query: {
		date: date(query(['from', 'to']).optional()),
	},

	pagination: [
		query('limit')
			.optional()
			.notEmpty()
			.withMessage('Empty field value.')
			.bail()
			.isInt({ min: 0 })
			.withMessage('Field value must be an integer & value >= 0.')
			.toInt(),
		query('offset')
			.optional()
			.notEmpty()
			.withMessage('Empty field value.')
			.bail()
			.isInt({ min: 0 })
			.withMessage('Field value must be an integer & value >= 0.')
			.toInt(),
		boolean(query('total').optional()),
	],

	integerRequired: (chain) => integer(chain.exists().withMessage('Field required.').bail()),
	integerOptional: (chain) => integer(chain.optional()),

	stringRequired: (chain) => string(chain.exists().withMessage('Field required.').bail()),
	stringOptional: (chain) => string(chain.optional()),

	booleanRequired: (chain) => boolean(chain.exists().withMessage('Field required.').bail()),
	booleanOptional: (chain) => boolean(chain.optional()),

	arrayRequired: (chain) => array(chain.exists().withMessage('Field required.').bail()),
	arrayOptional: (chain) => array(chain.optional()),

	dateRequired: (chain) => date(chain.exists().withMessage('Field required.').bail()),
	dateOptional: (chain) => date(chain.optional()),

	isInRequired: (chain, array) => isIn(chain.exists().withMessage('Field required.').bail(), array),
	isInOptional: (chain, array) => isIn(chain.optional(), array),

	emailRequired: (chain) => email(chain.exists().withMessage('Field required.').bail()),
	emailOptional: (chain) => email(chain.optional()),

	mongoIdRequired: (chain) => mongoId(chain.exists().withMessage('Field required.').bail()),
	mongoIdOptional: (chain) => mongoId(chain.optional()),

	notAllowed: (chain) =>
		chain.optional().custom((value) => {
			throw new Error('It is not allowed');
		}),
};
