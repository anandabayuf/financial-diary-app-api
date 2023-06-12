const schema = require("./schema");
const message = require("../constants/message");

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		schema.NoteSchema.find(
			{ date: data.date, userId: data.userId },
			async (err, result) => {
				if (err) {
					reject(err);
				} else {
					if (result.length === 0) {
						new schema.NoteSchema(data).save((err, response) => {
							if (err) {
								reject(err);
							} else {
								resolve(response.toObject());
							}
						});
					} else {
						reject(message["note.month_already_available"]);
					}
				}
			}
		).lean();
	});
};

exports.getAll = (query, userId) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = new Date(search[key]);

	return new Promise((resolve, reject) => {
		schema.NoteSchema.find({ [key]: value, userId: userId })
			.lean()
			.sort({ date: "descending" })
			.exec((err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
	});
};

exports.getById = (id) => {
	return new Promise((resolve, reject) => {
		schema.NoteSchema.findById(id, (err, result) => {
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
		schema.NoteSchema.findByIdAndUpdate(id, data, (err, result) => {
			if (err) {
				reject(err);
			} else {
				this.getById(id)
					.then((res) => resolve(res))
					.catch((error) => reject(error));
			}
		});
	});
};

exports.addEstimatedBalance = (id, balance) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((res) => {
				const newBalance = res.estimated.balance + balance;
				const newData = {
					...res,
					estimated: {
						...res.estimated,
						balance: newBalance,
					},
				};
				this.edit(id, newData)
					.then((edit) => resolve(edit))
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
};

exports.addEstimatedRemains = (id, remains) => {
	return new Promise((resolve, reject) => {
		this.getById(id)
			.then((res) => {
				const newRemains = res.estimated.remains + remains;
				const newData = {
					...res,
					estimated: {
						...res.estimated,
						remains: newRemains,
					},
				};
				this.edit(id, newData)
					.then((edit) => resolve(edit))
					.catch((err) => reject(err));
			})
			.catch((err) => reject(err));
	});
};

// exports.edit = (id, data) => {
// 	return new Promise((resolve, reject) => {
// 		schema.NoteSchema.findByIdAndUpdate(id, data, (err, result) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				this.getById(id)
// 					.then((res) => resolve(res))
// 					.catch((e) => reject(e));
// 			}
// 		}).lean();
// 	});
// };

// exports.delete = (id) => {
// 	return new Promise((resolve, reject) => {
// 		schema.NoteSchema.findByIdAndDelete(id, (err, result) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(result);
// 			}
// 		}).lean();
// 	});
// };
