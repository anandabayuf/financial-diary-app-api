const schema = require("./schema");

exports.create = (data) => {
	return new Promise((resolve, reject) => {
		new schema.CategorySchema(data).save((err, response) => {
			if (err) {
				reject(err);
			} else {
				// console.log(response);
				resolve(response.toObject());
			}
		});
	});
};

exports.getAll = (query, userId) => {
	let { limit = 5, page = 1, ...search } = query;
	const key = Object.keys(search);
	const value = search[key];

	return new Promise((resolve, reject) => {
		schema.CategorySchema.find(
			{ [key]: { $regex: `^${value}`, $options: "i" }, userId: userId },
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
		schema.CategorySchema.findById(id, (err, result) => {
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
		schema.CategorySchema.findByIdAndUpdate(id, data, (err, result) => {
			if (err) {
				reject(err);
			} else {
				this.getById(id)
					.then((res) => resolve(res))
					.catch((e) => reject(e));
			}
		}).lean();
	});
};

// exports.delete = (id) => {
// 	return new Promise((resolve, reject) => {
// 		schema.CategorySchema.findByIdAndDelete(id, (err, result) => {
// 			if (err) {
// 				reject(err);
// 			} else {
// 				resolve(result);
// 			}
// 		}).lean();
// 	});
// };
