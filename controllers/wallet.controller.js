const express = require("express");
const router = express.Router();
const message = require("../constants/message");

const walletModel = require("../models/wallet.model");

router.get("", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["wallet.success.get_all"],
			data: await walletModel.getAll(req.query, req.user.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["wallet.failed.get_all"],
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["wallet.success.get"],
			data: await walletModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["wallet.failed.get"],
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
			message: message["wallet.success.create"],
			data: await walletModel.create(data),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["wallet.failed.create"],
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: message["wallet.success.edit"],
			data: await walletModel.edit(req.params.id, req.body),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["wallet.failed.edit"],
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
