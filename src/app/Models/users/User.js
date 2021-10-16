const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {
	bcrypt: { rounds },
} = require('configKeys');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		_id: { type: Schema.ObjectId, auto: true },
		type: { type: String, enum: ['admin'], required: true },
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true, trim: true },
		password: {
			type: String,
			required: true,
			trim: true,
			select: false,
			set: (val) => (val ? bcrypt.hashSync(val, rounds) : undefined),
		},
		__t: { type: String, select: false },
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

// UserSchema.pre('save', async (next) => {
// 	this.password = await bcrypt.hash(this.password, 10);
// 	next();
// });

UserSchema.methods.verifyPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema, 'Users');

module.exports = User;
