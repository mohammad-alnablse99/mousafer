const mongodb = require('./mongodb');

module.exports = {
	init: () =>
		Promise.all([mongodb]).then(() => {
			console.log('MongoDB Connected...');
		}),
};
