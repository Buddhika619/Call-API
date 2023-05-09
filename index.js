
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



app.listen(9000, () => {
  console.log(`API server listening at http://localhost:9000`);
});

// exports.app = functions.https.onRequest(app);
