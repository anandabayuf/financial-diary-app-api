const schema = require("./schema");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const message = require("../constants/message");
const PublicModel = require("./public.model");
const userModel = require("./user.model");
const nodemailer = require("nodemailer");
const {
	NODEMAILER_AUTH_USER,
	NODEMAILER_AUTH_PASS,
	SECRET_KEY,
	CLIENT_BASE_URL,
} = require("../constants/constants");
const ejs = require("ejs");

config();

exports.authenticate = (data) => {
	let { username, password } = data;

	return new Promise((resolve, reject) => {
		schema.UserSchema.findOne({ username }, async (err, response) => {
			if (err) {
				reject(err);
			}

			if (response) {
				let decryptedPassword;
				try {
					decryptedPassword = await PublicModel.decrypt(password);
				} catch (error) {
					reject(error);
				}

				const passwordFromDB = response.password;
				const passwordFromUser = crypto
					.pbkdf2Sync(
						decryptedPassword,
						response.salt,
						1000,
						64,
						`sha512`
					)
					.toString(`hex`);

				if (passwordFromDB == passwordFromUser) {
					if (response.isEmailVerified) {
						const data = {
							id: response._id,
							username: response.username,
							name: response.name,
							email: response.email,
							isEmailVerified: response.isEmailVerified,
						};
						const token = jwt.sign(data, SECRET_KEY, {
							expiresIn: "86400s",
							algorithm: "HS256",
						});
						resolve(token);
					} else {
						reject(message["login.email_is_not_verified"]);
					}
				} else {
					reject(message["login.invalid_username_or_password"]);
				}
			} else {
				reject(message["login.invalid_username_or_password"]);
			}
		}).lean();
	});
};

exports.register = (data) => {
	return new Promise(async (resolve, reject) => {
		let decryptedPassword;
		try {
			decryptedPassword = await PublicModel.decrypt(data.password);
		} catch (error) {
			reject(error);
		}

		data.salt = crypto.randomBytes(16).toString("hex");
		data.password = crypto
			.pbkdf2Sync(decryptedPassword, data.salt, 1000, 64, `sha512`)
			.toString(`hex`);
		data.isEmailVerified = false;

		new schema.UserSchema(data).save((err, response) => {
			if (err) {
				if (err.code === 11000) {
					reject(message["register.username_taken"]);
				} else {
					reject(err);
				}
			} else {
				const { password, salt, picture, ...rest } =
					response.toObject();
				const jwtData = {
					id: rest._id,
					username: rest.username,
					name: rest.name,
					email: rest.email,
					isEmailVerified: rest.isEmailVerified,
				};

				this.sendVerificationEmail(jwtData)
					.then((res) => {
						resolve(rest);
					})
					.catch((error) => reject(error));
			}
		});
	});
};

exports.authToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, (err, data) => {
			if (err) {
				reject(message["auth.token_is_not_valid"]);
			} else {
				resolve(data);
			}
		});
	});
};

exports.sendVerificationEmail = (user) => {
	return new Promise(async (resolve, reject) => {
		const token = jwt.sign(user, SECRET_KEY, {
			expiresIn: "86400s",
			algorithm: "HS256",
		});

		try {
			let transporter = nodemailer.createTransport({
				service: "gmail",
				auth: {
					user: NODEMAILER_AUTH_USER,
					pass: NODEMAILER_AUTH_PASS,
				},
			});
			ejs.renderFile(
				__dirname + "/../views/verification-email.ejs",
				{
					name: user.name,
					link: `${CLIENT_BASE_URL}/email-verification?token=${token}`,
				},
				(err, data) => {
					if (err) {
						reject(err);
					} else {
						let message = {
							from: {
								name: "No-Reply - Financial Diary App",
								address: "no-reply@financial-diary.com",
							},
							to: user.email,
							subject: "Financial Diary - Email Verification", // Subject line
							html: data,
							attachments: [
								{
									filename: "Logo-Full-Light.png",
									path:
										__dirname +
										"/../public/images/Logo-Full-Light.png",
									cid: "logo",
								},
							],
						};

						transporter.sendMail(message, (err, info) => {
							if (err) {
								reject("Error occurred. " + err.message);
							} else {
								resolve(true);
							}
						});
					}
				}
			);
		} catch (err) {
			reject(err);
		}
	});
};

exports.verifyEmail = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, (err, res) => {
			if (err) {
				reject(message["verify_email.invalid_token"]);
			} else {
				userModel
					.getById(res.id)
					.then((user) => {
						if (user.isEmailVerified) {
							reject(message["verify_email.already_verified"]);
						} else {
							userModel
								.edit(res.id, { isEmailVerified: true })
								.then((result) => resolve(true))
								.catch((err) => reject(err));
						}
					})
					.catch((error) =>
						reject(message["verify_email.invalid_token"])
					);
			}
		});
	});
};

exports.sendForgotPasswordEmail = (email, username) => {
	return new Promise((resolve, reject) => {
		schema.UserSchema.findOne({ email, username }, (error, user) => {
			if (error) {
				reject(error);
			}

			if (user) {
				if (user.isEmailVerified) {
					const userData = user.toObject();

					const data = {
						id: userData._id,
						username: userData.username,
						name: userData.name,
						email: userData.email,
						isEmailVerified: userData.isEmailVerified,
					};

					const token = jwt.sign(data, SECRET_KEY, {
						expiresIn: "86400s",
						algorithm: "HS256",
					});

					try {
						let transporter = nodemailer.createTransport({
							service: "gmail",
							auth: {
								user: NODEMAILER_AUTH_USER,
								pass: NODEMAILER_AUTH_PASS,
							},
						});
						ejs.renderFile(
							__dirname + "/../views/forgot-password-email.ejs",
							{
								name: user.name,
								link: `${CLIENT_BASE_URL}/reset-password?token=${token}`,
							},
							(err, data) => {
								if (err) {
									reject(err);
								} else {
									let email = {
										from: {
											name: "No-Reply - Financial Diary App",
											address:
												"no-reply@financial-diary.com",
										},
										to: user.email,
										subject:
											"Financial Diary - Forgot Password", // Subject line
										html: data,
										attachments: [
											{
												filename: "Logo-Full-Light.png",
												path:
													__dirname +
													"/../public/images/Logo-Full-Light.png",
												cid: "logo",
											},
										],
									};

									transporter.sendMail(email, (err, info) => {
										if (err) {
											reject(
												"Error occurred. " + err.message
											);
										} else {
											resolve(
												message[
													"forgot_password.send_email_success"
												]
											);
										}
									});
								}
							}
						);
					} catch (err) {
						reject(err);
					}
				} else {
					reject(message["forgot_password.email_is_not_verified"]);
				}
			} else {
				reject(message["forgot_password.wrong_email_or_username"]);
			}
		});
	});
};

exports.resetPassword = (token, newPassword) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, async (err, data) => {
			if (err) {
				reject(message["reset_password.invalid_token"]);
			} else {
				try {
					const decryptedPassword = await PublicModel.decrypt(
						newPassword
					);
					const userId = data.id;

					userModel
						.getById(userId)
						.then((res) => {
							const newSalt = crypto
								.randomBytes(16)
								.toString("hex");
							const newPassword = crypto
								.pbkdf2Sync(
									decryptedPassword,
									newSalt,
									1000,
									64,
									`sha512`
								)
								.toString(`hex`);

							userModel
								.edit(userId, {
									password: newPassword,
									salt: newSalt,
								})
								.then((response) => {
									const { salt, password, picture, ...rest } =
										response;

									resolve(rest);
								})
								.catch((error) => reject(error));
						})
						.catch(() =>
							reject(message["reset_password.invalid_token"])
						);
				} catch (error) {
					reject(error);
				}
			}
		});
	});
};
