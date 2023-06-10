const { PUBLIC_KEY, PRIVATE_KEY } = require("../constants/constants");
const crypto = require("crypto");

exports.getPublicKey = () => {
	return new Promise((resolve, reject) => {
		try {
			resolve(PUBLIC_KEY);
		} catch (error) {
			reject(error);
		}
	});
};

exports.generateKeyPair = () => {
	return new Promise((resolve, reject) => {
		try {
			const { publicKey, privateKey } = crypto.generateKeyPairSync(
				"rsa",
				{
					modulusLength: 2048,
				}
			);

			resolve({
				publicKey: publicKey.export({ format: "pem", type: "pkcs1" }),
				privateKey: privateKey.export({ format: "pem", type: "pkcs1" }),
			});
		} catch (error) {
			reject(error);
		}
	});
};

exports.encrypt = (data) => {
	return new Promise((resolve, reject) => {
		try {
			const encryptedData = crypto.publicEncrypt(
				PUBLIC_KEY,
				// We convert the data string to a buffer using `Buffer.from`
				Buffer.from(data)
			);
			resolve(encryptedData.toString("base64"));
		} catch (error) {
			reject(error);
		}
	});
};

exports.decrypt = (data) => {
	return new Promise((resolve, reject) => {
		try {
			const decryptedData = crypto.privateDecrypt(
				PRIVATE_KEY,
				Buffer.from(data, "base64")
			);

			resolve(decryptedData.toString());
		} catch (error) {
			reject(error);
		}
	});
};
