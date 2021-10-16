const _ = require('lodash');
const Test = require('./service');
const { httpStatus, responseSender } = require('utils');

module.exports = {
	/** Add a new Test */
	save: async (req, res) => {
		const data = req.body;
		const result = await new Test(data).save();
		responseSender(res, { httpCode: httpStatus.UPDATED, responseData: result });
	},

	/** Update a Test */
	update: async (req, res) => {
		const { id } = req.params;
		const data = req.body;
		await new Test(data).update(id);
		responseSender(res, { httpCode: httpStatus.UPDATED });
	},

	/** Remove Test */
	remove: async (req, res) => {
		const { id } = req.params;
		const result = await Test.remove(id);
		responseSender(res, { httpCode: httpStatus.OK, responseData: result });
	},

	/** Get All Test */
	getAll: async (req, res) => {
		const result = await Test.getAll();
		responseSender(res, { httpCode: httpStatus.OK, responseData: result });
	},
};
