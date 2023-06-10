const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const multer = require("multer");
const userModel = require("../models/user.model");
const message = require("../constants/message");

const upload = multer({ storage: multer.memoryStorage() });

router.get("", async (req, res) => {
	try {
		const data = await userModel.getAll(req.query);

		let users = [];

		if (data.length > 0) {
			users = data.map((el) => {
				const { password, salt, ...rest } = el;
				return rest;
			});
		}

		res.status(200).json({
			status: 200,
			message: message["user.success.get_all"],
			data: users,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["user.failed.get_all"],
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const user = await userModel.getById(req.params.id);

		const { password, salt, ...rest } = user;

		res.status(200).json({
			status: 200,
			message: message["user.success.get"],
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["user.failed.get"],
			detail: err,
		});
	}
});

router.post("/", upload.single("picture"), async (req, res) => {
	let payload = JSON.parse(req.body.data);

	if (req.file) {
		payload["picture"] = {
			data: req.file.buffer,
			contentType: "image/png",
		};
	}

	payload.salt = crypto.randomBytes(16).toString("hex");
	payload.password = crypto
		.pbkdf2Sync(payload.password, payload.salt, 1000, 64, `sha512`)
		.toString(`hex`);

	try {
		const response = await userModel.create(payload);
		// console.log(response);
		const { password, salt, ...rest } = response;
		// console.log(rest);
		res.status(201).json({
			status: 201,
			message: message["user.success.create"],
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["user.failed.create"],
			detail: err,
		});
	}
});

router.put("/change-password", async (req, res) => {
	let payload = req.body;
	try {
		const response = await userModel.changePassword(
			payload.oldPassword,
			payload.newPassword,
			req.user.id
		);

		res.status(201).json({
			status: 201,
			message: message["change_password.success"],
			data: response,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["change_password.failed"],
			detail: err,
		});
	}
});

router.put("/:id", upload.single("picture"), async (req, res) => {
	let payload = JSON.parse(req.body.data);

	if (req.file) {
		payload["picture"] = {
			data: req.file.buffer,
			contentType: "image/png",
		};
	}

	if (payload.password) {
		payload.salt = crypto.randomBytes(16).toString("hex");
		payload.password = crypto
			.pbkdf2Sync(payload.password, payload.salt, 1000, 64, `sha512`)
			.toString(`hex`);
	}

	try {
		const user = await userModel.edit(req.params.id, payload);

		const { password, salt, ...rest } = user;

		res.status(201).json({
			status: 201,
			message: message["user.success.edit"],
			data: rest,
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["user.failed.edit"],
			detail: err,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await userModel.delete(req.params.id);
		res.status(200).json({
			status: 204,
			message: message["user.success.delete"],
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["user.failed.delete"],
			detail: err,
		});
	}
});

module.exports = router;
