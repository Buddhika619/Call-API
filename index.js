
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const app = express();
// var apn = require("apn");
const { v4: uuidv4 } = require("uuid");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("Hello World!");
});



// Use PORT provided in environment or default to 3000
var port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, '0.0.0.0', function () {
  // ...
});

// exports.app = functions.https.onRequest(app);
