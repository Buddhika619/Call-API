
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const app = express();
// var apn = require("apn");
const { v4: uuidv4 } = require("uuid");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const messaging = admin.messaging();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/initiate-call",async (req, res) => {
  console.log(req.body)
  
  const { calleeInfo, callerInfo } = req.body;

  if (calleeInfo.platform === "iOS") {
    
   
  } else if (calleeInfo.platform === "ANDROID") {
    var FCMtoken = calleeInfo.token;
    const info = JSON.stringify({
      callerInfo,
     
      type: "CALL_INITIATED",
    });
    var message = {
      data: {
        info,
      },
      android: {
        priority: "high",
      },
      token: FCMtoken,
    };

  await messaging.send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
  } else {
    res.status(400).send("Not supported platform");
  }
  res.send('done')
});

app.post("/update-call",async (req, res) => {
  console.log(req.body)
  
  const { callerInfo, type } = req.body;
  const info = JSON.stringify({
    callerInfo,
    type,
  });
  console.log(type)
  var message = {
    data: {
      info,
    },
    apns: {
      headers: {
        "apns-priority": "10",
      },
      payload: {
        aps: {
          badge: 1,
        },
      },
    },
    token: callerInfo.token,
  };

 await messaging.send(message)
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });

  res.send('done')
});

app.listen(9000, () => {
  console.log(`API server listening at http://localhost:9000`);
});

// exports.app = functions.https.onRequest(app);
