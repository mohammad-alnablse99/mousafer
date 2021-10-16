const fs = require('fs').promises;
const { Exception, errors, uploadFile, assetsPath } = require('utils');

const { Test } = require('../Models');

class TestService {
	constructor(data = {}) {
		this.name = data.name;
	}

	async save() {
		let result;
		const data = this;
		result = await Test.findOne({ name: data.name });
		if (result)
			throw new Exception({
				httpStatus: errors.DUPLICATED_ENTRY.httpStatus,
				responseStatus: errors.DUPLICATED_ENTRY.responseStatus,
				error: 'this test name is already exist',
			});

		result = await new Test(data).save();
		return { data: { id: result.id } };
	}

	async update(id) {
		let result;
		const data = this;
		if (data.name) {
			result = await Test.findOne({ name: data.name }, {}, {});
			if (result)
				throw new Exception({
					httpStatus: errors.DUPLICATED_ENTRY.httpStatus,
					responseStatus: errors.DUPLICATED_ENTRY.responseStatus,
					error: 'this test name is already exist',
				});
		}
		result = await Test.findByIdAndUpdate(id, data, { omitUndefined: true });
		if (!result)
			throw new Exception({
				httpStatus: errors.ITEM_NOT_FOUND.httpStatus,
				responseStatus: errors.ITEM_NOT_FOUND.responseStatus,
				error: 'invaled test id',
			});

		return;
	}

	static async getAll() {
		const result = await Test.find();
		return result;
	}

	static async remove(id) {
		const result = await Test.findOneAndDelete({ _id: id });
		if (!result) throw new Exception(errors.ITEM_NOT_FOUND);
		return;
	}
}

module.exports = TestService;
