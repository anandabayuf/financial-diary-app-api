const express = require("express");
const router = express.Router();
const multer = require("multer");
const authModel = require("../models/auth.model");
const message = require("../constants/message");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", async (req, res) => {
	const credential = req.body;

	try {
		res.status(200).json({
			status: 200,
			message: message["login.success"],
			data: await authModel.authenticate(credential),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["login.failed"],
			detail: err,
		});
	}
});

router.post("/register", upload.single("picture"), async (req, res) => {
	let payload = JSON.parse(req.body.data);

	if (req.file) {
		payload["picture"] = {
			data: req.file.buffer,
			contentType: "image/png",
		};
	}

	try {
		res.status(201).json({
			status: 201,
			message: message["register.success"],
			data: await authModel.register(payload),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["register.failed"],
			detail: err,
		});
	}
});

router.get("/auth-token", async (req, res) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	try {
		res.status(200).json({
			status: 200,
			message: message["authtoken.success"],
			data: await authModel.authToken(token),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			message: message["authtoken.failed"],
			detail: err,
		});
	}
});

router.get("/check-token", async (req, res) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	try {
		res.status(200).json({
			status: 200,
			message: message["authtoken.success"],
			data: await authModel.authToken(token),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["authtoken.failed"],
			detail: err,
		});
	}
});

router.post("/verify-email", async (req, res) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	try {
		res.status(201).json({
			status: 201,
			message: message["verify_email.success"],
			data: await authModel.verifyEmail(token),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["verify_email.failed"],
			detail: err,
		});
	}
});

router.post("/forgot-password", async (req, res) => {
	const email = req.body.email;
	const username = req.body.username;

	try {
		res.status(201).json({
			status: 201,
			message: message["forgot_password.success"],
			data: await authModel.sendForgotPasswordEmail(email, username),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["forgot_password.failed"],
			detail: err,
		});
	}
});

router.put("/reset-password", async (req, res) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];
	const newPassword = req.body.newPassword;

	try {
		res.status(201).json({
			status: 201,
			message: message["reset_password.success"],
			data: await authModel.resetPassword(token, newPassword),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["reset_password.failed"],
			detail: err,
		});
	}
});

module.exports = router;
