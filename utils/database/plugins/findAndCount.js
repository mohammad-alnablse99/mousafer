const {
	pagination: { defaultLimit, defaultSkip, defaultTotal },
} = require('../../constants/common');
module.exports = function (schema, options) {
	schema.statics.findAndCount = async function (
		total = defaultTotal,
		criteria = {},
		pagination = {},
		options = { limit: defaultLimit, skip: defaultSkip }
	) {
		let result = [];
		result.push(this.find(criteria, pagination, options));
		if (total === true) result.push(this.countDocuments(criteria));
		const [data, count] = await Promise.all(result);
		return { total: count, data: data };
	};
};
