const winston = require('winston');
const chalk = require('chalk');
const moment = require('moment');
const nodePath = require('path');

const levels = {
	Error: 0,
	Warn: 1,
	Info: 2,
	Debug: 3,
};

const generalLogger = winston.createLogger({
	level: 'Debug',
	levels,
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(({ level, message, timestamp, path }) => {
			let customLevel;
			switch (level) {
				case 'Error':
					customLevel = chalk.bold.redBright(level + ':');
					break;
				case 'Warn':
					customLevel = chalk.bold.yellowBright(level + ': ');
					break;
				case 'Info':
					customLevel = chalk.bold.greenBright(level + ': ');
					break;
				case 'Debug':
					customLevel = chalk.bold.cyan(level + ':');
					break;
			}
			timestamp = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
			timestamp = chalk.blueBright(timestamp);
			path = chalk.bold.magentaBright('Path: ') + './' + nodePath.relative(process.cwd(), path);
			let msg = message;

			if (typeof msg == 'object') msg = require('util').inspect(msg, { colors: true, depth: 3 });
			if (level === 'Error' && message.stack) {
				return `${timestamp}  ${customLevel} \n${msg}`;
			} else {
				return `${timestamp}  ${customLevel}  ${msg}  ${path}`;
			}
		})
	),
	transports: [new winston.transports.Console()],
});

/**
 * Logger
 *
 * @param {String} level One Of ["Error", "Warn", "Info", "Debug"]
 * @param {String} message Message To Log
 * @returns {void}
 *
 */
const logger = (level, message) => {
	let error = new Error();
	let stackTrace = error.stack.split('\n');
	stackTrace = stackTrace[Math.min(4, stackTrace.length - 1)];
	let filePath = stackTrace.split('(');
	filePath = filePath[Math.min(1, filePath.length - 1)];
	filePath = filePath.replace(')', '');
	filePath = filePath.replace('    at ', '');
	const path = filePath;
	generalLogger.log({ level, message, path });
};
/**
 * Use It For Warnings
 *
 * @returns {void}
 * @param messages
 */

const warn = (...messages) => {
	for (const message of messages) logger('Warn', message);
};

/**
 * Use It For Errors
 *
 * @returns {void}
 * @param messages
 */
const error = (...messages) => {
	for (const message of messages) logger('Error', message);
};
/**
 * Use It For Information
 *
 * @returns {void}
 * @param messages
 */
const info = (...messages) => {
	for (const message of messages) logger('Info', message);
};

/**
 * Use It For Debugging
 *
 * @returns {void}
 * @param messages
 */
const debug = (...messages) => {
	for (const message of messages) logger('Debug', message);
};

module.exports = {
	info,
	warn,
	error,
	debug,
	log: info,
};
