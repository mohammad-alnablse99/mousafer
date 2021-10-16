const { body } = require('express-validator');
const {
	validator: { chainBuilder, commonChain },
} = require('utils');

const update = chainBuilder([commonChain.params.id, commonChain.stringOptional(body(['name']))]);

const save = chainBuilder([commonChain.stringRequired(body(['name']))]);

const paramId = chainBuilder([commonChain.params.id]);

module.exports = {
	update,
	paramId,
	save,
};
