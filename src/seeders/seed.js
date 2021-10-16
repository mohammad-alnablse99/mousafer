console.log('Seeding Start');
console.time('Seeding finish in');
require('../../config');
const database = require('../../utils/database');
const mongoose = require('mongoose');

database.init().then(async () => {
	const models = require('../app/Models');
	const data = require('./initData');

	for (const val of data) {
		console.time(val.model);
		try {
			await models[val.model].deleteMany();
			await models[val.model].insertMany(val.documents);
		} catch (err) {
			console.log('Error in seeding ' + val.model);
			console.log(err.message);
			console.log(err);
			process.exit(1);
		}
		console.timeEnd(val.model);
	}
	console.timeEnd('Seeding finish in');
	mongoose.disconnect();
});
