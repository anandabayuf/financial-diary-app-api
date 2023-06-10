const express = require("express");
const router = express.Router();
const message = require("../constants/message");

const categoryModel = require("../models/category.model");

router.get("", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["category.success.get_all"],
			data: await categoryModel.getAll(req.query, req.user.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["category.failed.get_all"],
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["category.success.get"],
			data: await categoryModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["category.failed.get"],
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	let data = req.body;

	data.userId = req.user.id;

	try {
		res.status(201).json({
			status: 201,
			message: message["category.success.create"],
			data: await categoryModel.create(data),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["category.failed.create"],
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: message["category.success.edit"],
			data: await categoryModel.edit(req.params.id, req.body),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["category.failed.edit"],
			detail: err,
		});
	}
});

// router.delete("/:id", async (req, res) => {
// 	try {
// 		await userModel.delete(req.params.id);
// 		res.status(200).json({
// 			status: 204,
// 			message: "Successfully delete user data",
// 		});
// 	} catch (err) {
// 		res.status(404).json({
// 			status: 404,
// 			message: "Failed to delete user data",
// 			detail: err,
// 		});
// 	}
// });

module.exports = router;
