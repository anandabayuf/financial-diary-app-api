const express = require("express");
const bodyParser = require("body-parser");
const { config } = require("dotenv");
const controllers = require("./controllers");
var cors = require("cors");

config();

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

controllers(app);

app.listen(port, () => {
	console.log(
		`Income&Spending App API listening on http://localhost:${port}/api`
	);
});
