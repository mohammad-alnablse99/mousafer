const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestSchema = new Schema(
	{
		_id: { type: Schema.ObjectId, auto: true },
		name: { type: String, required: true, unique: true },
		updatedAt: { type: Date, select: false },
	},
	{
		timestamps: true,
		useNestedStrict: true,
		optimisticConcurrency: true,
		toObject: {
			virtuals: true,
			versionKey: false,
			transform: (_, ret) =>
				delete ret._id && delete ret.__t && delete ret.deleted && ret.id !== null
					? { id: ret.id, ...ret }
					: delete ret.id && ret,
		},
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (_, ret) =>
				delete ret._id && delete ret.__t && delete ret.deleted && ret.id !== null
					? { id: ret.id, ...ret }
					: delete ret.id && ret,
		},
	}
);

const Test = mongoose.model('Test', TestSchema, 'Tests');

module.exports = Test;
