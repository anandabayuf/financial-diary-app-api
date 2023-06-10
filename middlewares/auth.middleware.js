const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants/constants");
const message = require("../constants/message");

exports.isAuthenticated = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];

	jwt.verify(token, SECRET_KEY, (err, user) => {
		if (err) {
			return res.status(401).json({
				status: 401,
				message: message["auth.token_is_not_valid"],
			});
		} else {
			req.user = user;
			next();
		}
	});
};
