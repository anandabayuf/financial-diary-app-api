const { config } = require("dotenv");

config();

const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_URI = process.env.MONGO_URI;

const PUBLIC_KEY = process.env.PUBLIC_KEY.split(String.raw`\n`).join("\n");
const PRIVATE_KEY = process.env.PRIVATE_KEY.split(String.raw`\n`).join("\n");

const NODEMAILER_AUTH_USER = process.env.NODEMAILER_AUTH_USER;
const NODEMAILER_AUTH_PASS = process.env.NODEMAILER_AUTH_PASS;

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

module.exports = {
	MONGO_URI,
	SECRET_KEY,
	PUBLIC_KEY,
	PRIVATE_KEY,
	NODEMAILER_AUTH_USER,
	NODEMAILER_AUTH_PASS,
	CLIENT_BASE_URL,
};
