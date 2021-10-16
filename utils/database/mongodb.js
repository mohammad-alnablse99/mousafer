const mongoose = require('mongoose');
const { mongo } = require('../../config');
module.exports = mongoose.connect(mongo.uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	bufferCommands: false,
	useCreateIndex: true,
	useFindAndModify: false,
});
