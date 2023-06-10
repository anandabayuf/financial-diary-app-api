const express = require("express");
const router = express.Router();
const message = require("../constants/message");

const noteItemModel = require("../models/noteitem.model");

router.get("/note/:noteId", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["noteitem.success.get_all"],
			data: await noteItemModel.getAll(
				req.query,
				req.params.noteId,
				req.user.id
			),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["noteitem.failed.get_all"],
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["noteitem.success.get"],
			data: await noteItemModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["noteitem.failed.get"],
			detail: err,
		});
	}
});

router.post("/note/:noteId", async (req, res) => {
	let data = req.body;
	data["noteId"] = req.params.noteId;
	data["userId"] = req.user.id;

	try {
		res.status(201).json({
			status: 201,
			message: message["noteitem.success.create"],
			data: await noteItemModel.create(req.params.noteId, data),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["noteitem.failed.create"],
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: message["noteitem.success.edit"],
			data: await noteItemModel.editFunction(req.params.id, req.body),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["noteitem.failed.edit"],
			detail: err,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await noteItemModel.deleteFunction(req.params.id);
		res.status(200).json({
			status: 204,
			message: message["noteitem.success.delete"],
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["noteitem.failed.delete"],
			detail: err,
		});
	}
});

module.exports = router;
