//Request Validator
const { validationResult } = require('express-validator');
const httpStatus = require('../constants/httpStatus');
const statusCodes = require('../constants/statusCodes');
const responseErrorSender = require('../wrappers/responseErrorSender');

/******************
 * @ErrorHandler *
 *****************/

/**
 * Validator Error Handler
 *
 * @param {Request} req Http Request
 * @param {Response} res Http Response
 * @param {*} next Next Function
 */

const errorHandler = (req, res, next) => {
	const errors = validationResult(req);
	errors.isEmpty()
		? next()
		: responseErrorSender(res, {
				httpStatus: httpStatus.VALIDATION_ERROR,
				responseStatus: statusCodes.VALIDATION_ERROR,
				errors: errors.array(),
		  });
};

/************
 * @Exports *
 ************/

//Validator Error Handler
module.exports = errorHandler;
