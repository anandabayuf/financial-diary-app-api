const schema = require("./schema");
const message = require("../constants/message");
const publicModel = require("./public.model");
const crypto = require("crypto");

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		new schema.UserSchema(data).save((err, response) => {
			if (err) {
				if (err.code === 11000) {
					reject(message["user.username_taken"]);
				} else {
					reject(err);
				}
			} else {
				resolve(response.toObject());
			}
		});
	});
};

exports.getAll = (query) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.UserSchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" } },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}
		).lean();
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.UserSchema.findById(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		}).lean();
	});
};

exports.edit = (id, data) => {
	return new Promise((resolve, reject) => {
		schema.UserSchema.findByIdAndUpdate(id, data, (err, result) => {
			if (err) {
				if (err.code === 11000) {
					reject(message["user.username_taken"]);
				} else {
					reject(err);
				}
			} else {
				this.getById(id)
					.then((res) => resolve(res))
					.catch((e) => reject(e));
			}
		}).lean();
	});
};

exports.delete = (id) => {
	return new Promise((resolve, reject) => {
		schema.UserSchema.findByIdAndDelete(id, (err, result) => {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		}).lean();
	});
};

exports.verifyPassword = (password, userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const decryptedPassword = await publicModel.decrypt(password);

			this.getById(userId)
				.then((user) => {
					const password = crypto
						.pbkdf2Sync(
							decryptedPassword,
							user.salt,
							1000,
							64,
							`sha512`
						)
						.toString(`hex`);

					if (user.password === password) {
						resolve({
							isVerified: true,
							user: user,
						});
					} else {
						reject(message["change_password.incorrect_password"]);
					}
				})
				.catch((error) => reject(error));
		} catch (error) {
			reject(error);
		}
	});
};

exports.changePassword = (oldPassword, newPassword, userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { isVerified, user } = await this.verifyPassword(
				oldPassword,
				userId
			);

			if (isVerified) {
				try {
					const decryptedNewPassword = await publicModel.decrypt(
						newPassword
					);

					const newPasswordSalted = crypto
						.pbkdf2Sync(
							decryptedNewPassword,
							user.salt,
							1000,
							64,
							`sha512`
						)
						.toString(`hex`);

					if (newPasswordSalted === user.password) {
						reject(message["change_password.same_password"]);
					} else {
						const newSalt = crypto.randomBytes(16).toString("hex");
						const newPassword = crypto
							.pbkdf2Sync(
								decryptedNewPassword,
								newSalt,
								1000,
								64,
								`sha512`
							)
							.toString(`hex`);
						this.edit(userId, {
							password: newPassword,
							salt: newSalt,
						})
							.then((res) => {
								resolve(true);
							})
							.catch((err) => reject(err));
					}
				} catch (error) {
					reject(error);
				}
			}
		} catch (error) {
			reject(error);
		}
	});
};
