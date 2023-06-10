const exception = {
	"login.failed": "login.failed", //"Failed to sign in"
	"login.invalid_username_or_password": "login.exception.001", //"You have entered and invalid email or password"
	"login.email_is_not_verified": "login.exception.002", //"Email has not been verified, please verify in order to use the Financial Diary App"

	"register.failed": "register.failed", //"Failed to register"
	"register.username_taken": "register.exception.001", // "Username is already taken"

	"authtoken.failed": "authtoken.failed", //"Token is not valid"
	"auth.token_is_not_valid": "auth.exception.001", //"A client is forbidden from accessing a valid resource"

	"verify_email.failed": "verify_email.failed", //"Failed to verify email"
	"verify_email.already_verified": "verify_email.exception.001", //"Email already verified"
	"verify_email.invalid_token": "verify_email.exception.002", //"Invalid Token"

	"forgot_password.failed": "forgot_password.failed", //"Failed to send forgot password email"
	"forgot_password.email_is_not_verified": "forgot_password.exception.001", //"Email has not been verified, please verify in order to use the Financial Diary App"
	"forgot_password.wrong_email_or_username": "forgot_password.exception.002", //"user with that email address or username not found"

	"reset_password.failed": "reset_password.failed", //"Failed to reset password",
	"reset_password.invalid_token": "reset_password.exception.001", //"Token is not valid or expired",

	"user.failed.create": "user.failed.create", // "Failed to create user"
	"user.username_taken": "user.exception.001", // "Username is already taken"
	"user.failed.get_all": "user.failed.get_all", // "Failed to get all users data"
	"user.failed.get": "user.failed.get", // "Failed to get user data"
	"user.failed.edit": "user.failed.edit", // "Failed to edit user data"
	"user.failed.delete": "user.failed.delete", // "Failed to delete user data"

	"change_password.failed": "change_password.failed", //"Failed to change password"
	"change_password.incorrect_password": "change_password.exception.001", //"Incorrect password"
	"change_password.same_password": "change_password.exception.002", //"You have entered the same password, if you want to change the password, please change it to new one"

	"category.failed.create": "category.failed.create", // "Failed to create user category"
	"category.failed.get_all": "category.failed.get_all", // "Failed to get user category"
	"category.failed.get": "category.failed.get", // "Failed to get user category data"
	"category.failed.edit": "category.failed.edit", // "Failed to edit user category data"

	"wallet.failed.create": "wallet.failed.create", // "Failed to create user wallet"
	"wallet.failed.get_all": "wallet.failed.get_all", // "Failed to get user wallet"
	"wallet.failed.get": "wallet.failed.get", // "Failed to get user wallet data"
	"wallet.failed.edit": "wallet.failed.edit", // "Failed to edit user wallet data"

	"note.failed.create": "note.failed.create", // "Failed to create user note"
	"note.month_already_available": "note.exception.001", // "Note with the month is already available"
	"note.failed.get_all": "note.failed.get_all", // "Failed to get user note"
	"note.failed.get": "note.failed.get", // "Failed to get user note data"

	"categorynote.failed.create": "categorynote.failed.create", // "Failed to create category note"
	"categorynote.already_added": "categorynote.exception.001", //"Cannot add category, there is Category which has been added"
	"categorynote.failed.get_all": "categorynote.failed.get_all", // "Failed to get category note"
	"categorynote.failed.get_available": "categorynote.failed.get_available", // "Failed to get available category note"
	"categorynote.failed.get": "categorynote.failed.get", // "Failed to get category note data"
	"categorynote.failed.edit": "categorynote.failed.edit", // "Failed to edit category note data"
	"categorynote.failed.edit_estimated": "categorynote.failed.edit_estimated", // "Failed to edit category note estimated total data"

	"walletnote.failed.create": "walletnote.failed.create", // "Failed to create wallet note"
	"walletnote.already_added": "walletnote.exception.001", //"Cannot add wallet, there is Wallet which has been added"
	"walletnote.failed.get_all": "walletnote.failed.get_all", // "Failed to get wallet note"
	"walletnote.failed.get_available": "walletnote.failed.get_available", // "Failed to get available wallet note"
	"walletnote.failed.get": "walletnote.failed.get", // "Failed to get wallet note data"
	"walletnote.failed.edit": "walletnote.failed.edit", // "Failed to edit wallet note data"
	"walletnote.failed.edit_estimated": "walletnote.failed.edit_estimated", // "Failed to edit wallet note estimated total data"

	"noteitem.failed.create": "noteitem.failed.create", // "Failed to create user note item"
	"noteitem.income_gt_0": "noteitem.exception.001", // "Income amount must be zero or positive number"
	"noteitem.transfer_gt_0": "noteitem.exception.002", // "Transfer amount must be zero or positive number"
	"noteitem.spend_gt_0": "noteitem.exception.003", // "Total amount must be zero or positive number"
	"noteitem.invalid_type": "noteitem.exception.004", // "Cannot add item. Invalid type item"
	"noteitem.invalid_date": "noteitem.exception.005", // Cannot add item. The range of note is from 26-XX-XXXX to 25-XX-XXXX
	"noteitem.failed.get_all": "noteitem.failed.get_all", // "Failed to get user note item"
	"noteitem.failed.get": "noteitem.failed.get", // "Failed to get user note item data"
	"noteitem.failed.edit": "noteitem.failed.edit", // "Failed to edit user note item data"
	"noteitem.failed.delete": "noteitem.failed.delete", // "Failed to delete user note item data"
};

const success = {
	"login.success": "login.success", //"Successfully sign in"
	"register.success": "register.success", //"Successfully register"
	"authtoken.success": "authtoken.success", //"Token is valid"

	"verify_email.success": "verify_email.success", //"Sucessfully verify email"

	"forgot_password.success": "forgot_password.success", //"Successfully sent forgot password email"
	"forgot_password.send_email_success": "forgot_password.send_email_success", //"We have sent an email to the linked account to reset the password. Please check your email"

	"reset_password.success": "reset_password.success", //"Successfully reset your password"

	"user.success.create": "user.success.create", // "Successfully create user"
	"user.success.get_all": "user.success.get_all", //"Successfully get all users data"
	"user.success.get": "user.success.get", //"Successfully get user data"
	"user.success.edit": "user.success.edit", //"Successfully edit user data"
	"user.success.delete": "user.succcess.delete", //"Successfully delete user data"

	"change_password.success": "change_password.success", //"Successfully change password"

	"category.success.create": "category.success.create", // "Successfully create user category"
	"category.success.get_all": "category.success.get_all", // "Successfully get user category"
	"category.success.get": "category.success.get", // "Successfully get user category data"
	"category.success.edit": "category.success.edit", // "Successfully edit user category data"

	"wallet.success.create": "wallet.success.create", // "Successfully create user wallet"
	"wallet.success.get_all": "wallet.success.get_all", // "Successfully get user wallet"
	"wallet.success.get": "wallet.success.get", // "Successfully get user wallet data"
	"wallet.success.edit": "wallet.success.edit", // "Successfully edit user wallet data"

	"note.success.create": "note.success.create", // "Successfully create user note"
	"note.success.get_all": "note.success.get_all", // "Successfully get user note"
	"note.success.get": "note.success.get", // "Successfully get user note data"

	"categorynote.success.create": "categorynote.success.create", // "Successfully create category note"
	"categorynote.success.get_all": "categorynote.success.get_all", // "Successfully get category note"
	"categorynote.success.get_available": "categorynote.success.get_available", // "Successfully get available category note"
	"categorynote.success.get": "categorynote.success.get", // "Successfully get category note data"
	"categorynote.success.edit": "categorynote.success.edit", // "Successfully edit category note data"
	"categorynote.success.edit_estimated":
		"categorynote.success.edit_estimated", // "Successfully edit category note estimated total data"

	"walletnote.success.create": "walletnote.success.create", // "Successfully create wallet note"
	"walletnote.success.get_all": "walletnote.success.get_all", // "Successfully get wallet note"
	"walletnote.success.get_available": "walletnote.success.get_available", // "Successfully get available wallet note"
	"walletnote.success.get": "walletnote.success.get", // "Successfully get wallet note data"
	"walletnote.success.edit": "walletnote.success.edit", // "Successfully edit wallet note data"
	"walletnote.success.edit_estimated": "walletnote.success.edit_estimated", // "Successfully edit wallet note estimated balance data"

	"noteitem.success.create": "noteitem.success.create", // "Successfully create user note item"
	"noteitem.success.get_all": "noteitem.success.get_all", // "Successfully get user note item"
	"noteitem.success.get": "noteitem.success.get", // "Successfully get user note item data"
	"noteitem.success.edit": "noteitem.success.edit", // "Successfully edit user note item data"
	"noteitem.success.delete": "noteitem.success.delete", // "Successfully delete user note item data"
};

const message = {
	...exception,
	...success,
};

module.exports = message;
