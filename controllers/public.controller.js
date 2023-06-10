const express = require("express");
const router = express.Router();
const publicModel = require("../models/public.model");
const message = require("../constants/message");

router.get("/public-key", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["public.success.get_public_key"],
			data: await publicModel.getPublicKey(),
		});
	} catch (err) {
		res.status(400).json({
			status: 400,
			message: message["public.failed.get_public_key"],
			detail: err,
		});
	}
});

router.get("/key-pair", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			// message: message["public.success.get_public_key"],
			data: await publicModel.generateKeyPair(),
		});
	} catch (err) {
		res.status(400).json({
			status: 400,
			// message: message["public.failed.get_public_key"],
			detail: err,
		});
	}
});

router.post("/encrypt", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			// message: message["authtoken.success"],
			data: await publicModel.encrypt(req.body.data),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			// message: message["authtoken.failed"],
			detail: err,
		});
	}
});

router.post("/decrypt", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			// message: message["authtoken.success"],
			data: await publicModel.decrypt(req.body.data),
		});
	} catch (err) {
		res.status(401).json({
			status: 401,
			// message: message["authtoken.failed"],
			detail: err,
		});
	}
});

module.exports = router;
