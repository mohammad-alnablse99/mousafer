process.env.TZ = 'UTC';

const logger = require('./logger/console');

console.log = function () {
	return logger.info.apply(logger, arguments);
};
console.info = function () {
	return logger.info.apply(logger, arguments);
};
console.warn = function () {
	return logger.warn.apply(logger, arguments);
};
console.debug = function () {
	return logger.debug.apply(logger, arguments);
};
console.error = function () {
	return logger.error.apply(logger, arguments);
};

module.exports = {
	catchAsync: require('./errorHandlers/catchAsync'),
	Exception: require('./errorHandlers/Exception'),
	validator: { chainBuilder: require('./validator/chainBuilder'), commonChain: require('./validator/commonChains') },
	httpStatus: require('./constants/httpStatus'),
	statusCodes: require('./constants/statusCodes'),
	errors: require('./constants/errors'),
	commonConstant: require('./constants/common'),
	database: require('./database'),
	dbPlugins: require('./database/plugins'),
	logger: require('./logger'),
	responseSender: require('./wrappers/responseSender'),
	responseErrorSender: require('./wrappers/responseErrorSender'),
	assetsPath: require('./fileHelpers/assetsPath'),
	uploadFile: require('./fileHelpers/uploadFile'),
};
