const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const {
	dbPlugins: { findAndCount },
} = require('utils');

mongoose.plugin(findAndCount);
mongoose.plugin(mongoose_delete, { overrideMethods: 'all', deletedAt: true, deleteBy: true });
