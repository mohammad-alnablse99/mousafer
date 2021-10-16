const httpStatusCode = require('../constants/httpStatus');
const statusCodes = require('../constants/statusCodes');
const responseErrorSender = require('../wrappers/responseErrorSender');
const errorsCodes = require('../constants/errors');
class Exception extends Error {
	constructor({ httpStatus = httpStatusCode.BAD_REQUEST, responseStatus = statusCodes.DEFAULT, error = undefined }) {
		super();
		this.isCustom = true;

		this.httpStatus = httpStatus;
		this.responseStatus = responseStatus;

		if (!error) this.errors = [];
		else if (typeof error === 'string') this.errors = [{ msg: error }];
		else if (typeof error === 'object' && error.length !== undefined) this.errors = error;
		else this.errors = [error];
	}

	static requestDefaultHandler(err, req, res, next) {
		if (err.isCustom !== true) {
			console.error(err);
			if (err.type === 'entity.parse.failed') {
				err = errorsCodes.JSON_PARSE_ERROR;
			}
			if (err.code === 'LIMIT_FILE_SIZE') {
				// *Multer
				// TODO:check what we can get from err to send
				err = errorsCodes.MULTER_LIMIT_FILE_SIZE;
			}
			if (err.kind === 'ObjectId') {
				// * Mongoose
				err = errorsCodes.Mongoose_OBJECT_ID;
			}
			if (err.errno === -4058) {
				//file system error : no such file or directory
				err = errorsCodes.ITEM_NOT_FOUND;
			}
		}

		if (!res.headersSent) {
			responseErrorSender(res, err);
		}
		console.error(err);
	}

	static defaultHandler(err) {
		console.error(err);
		process.exit(1);
	}
}

module.exports = Exception;
