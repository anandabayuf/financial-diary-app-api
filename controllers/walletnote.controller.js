const express = require("express");
const router = express.Router();
const message = require("../constants/message");

const walletNoteModel = require("../models/walletnote.model");

router.get("/note/:noteId", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["walletnote.success.get_all"],
			data: await walletNoteModel.getAll(req.query, req.params.noteId),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["walletnote.failed.get_all"],
			detail: err,
		});
	}
});

router.get("/note/:noteId/available", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["walletnote.success.get_available"],
			data: await walletNoteModel.getAllAvailableByNoteId(
				req.query,
				req.params.noteId,
				req.user.id
			),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["walletnote.failed.get_available"],
			detail: err,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.status(200).json({
			status: 200,
			message: message["walletnote.success.get"],
			data: await walletNoteModel.getById(req.params.id),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["walletnote.failed.get"],
			detail: err,
		});
	}
});

router.post("/", async (req, res) => {
	let data = req.body;

	let payload = data.walletIds.map((id) => {
		return {
			userId: req.user.id,
			walletId: id,
			noteId: data.noteId,
			balance: 0,
			estimated: {
				balance: 0,
			},
		};
	});

	try {
		res.status(201).json({
			status: 201,
			message: message["walletnote.success.create"],
			data: await walletNoteModel.create(payload),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["walletnote.failed.create"],
			detail: err,
		});
	}
});

router.post("/estimated", async (req, res) => {
	let data = req.body;

	/*
    payload {
        walletId,
        noteId,
        balance,
        estimated: {
            balance,
            remains
        }
    }
    */

	let payload = data.map((el) => {
		return {
			userId: req.user.id,
			walletId: el.walletId,
			noteId: el.noteId,
			balance: 0,
			estimated: {
				balance: el.estimated.balance,
			},
		};
	});

	try {
		res.status(201).json({
			status: 201,
			message: message["walletnote.success.create"],
			data: await walletNoteModel.create(payload),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["walletnote.failed.create"],
			detail: err,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		res.status(201).json({
			status: 201,
			message: message["walletnote.success.edit"],
			data: await walletNoteModel.edit(req.params.id, req.body),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["walletnote.failed.edit"],
			detail: err,
		});
	}
});

router.put("/:id/estimated", async (req, res) => {
	let data = req.body;

	try {
		res.status(201).json({
			status: 201,
			message: message["walletnote.success.edit_estimated"],
			data: await walletNoteModel.editEstimatedBalance(
				req.params.id,
				data.noteId,
				data.estimated.balance
			),
		});
	} catch (err) {
		res.status(404).json({
			status: 404,
			message: message["walletnote.failed.edit_estimated"],
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
