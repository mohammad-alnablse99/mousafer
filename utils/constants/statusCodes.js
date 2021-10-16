module.exports = {
	SUCCESS: {
		code: 2000,
		msg: 'Success',
	},
	GENERAL_ERROR: {
		code: 5000,
		msg: 'General Error Occurs',
	},
	DEFAULT: {
		code: 4000,
		msg: 'Error',
	},
	INVALID_CREDENTIAL: {
		code: 4003,
		msg: 'Invalid Credential',
	},
	INVALID_TOKEN: {
		code: 4004,
		msg: 'Invalid Token',
	},
	ITEM_NOT_FOUND: {
		code: 4104,
		msg: 'Item Not Found',
	},
	VALIDATION_ERROR: {
		code: 4202,
		msg: 'Input Error',
	},
	// * Multer limit file size
	LIMIT_FILE_SIZE: {
		code: 4203,
		msg: 'Max Upload Limit Exceeded',
	},
	NON_SUPPORTED_FILE_TYPE: {
		code: 4204,
		msg: 'Non Supported File Type',
	},
};
