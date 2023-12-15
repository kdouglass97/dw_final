/* IMPORTS */
// express
const express = require("express"); 
const app = express();
//cors (for cross-origin access)
const cors = require("cors");
const port = 4000;

const firebase = require("firebase/app");
const firebaseConfig = require("./firebase-config");

// initialize firebase
firebase.initializeApp(firebaseConfig);

// local port
const PORT = 4000;

/* SETUP */
// allow cross-origin so the server can commmunicate with the client
app.use(cors());

/* ROUTING */
const indexRoute = require('./routes/index');
const getMooseRoute = require('./routes/getMoose');
const createUserRoute = require('./routes/createUser');
const createPostRoute = require('./routes/createPost');
  
app.use("/", indexRoute);
app.use("/getMoose", getMooseRoute);
app.use("/createUser", createUserRoute);
app.use("/createPost", createPostRoute);

app.listen(port, () => {
    console.log(`Final project listening on port ${port}`);
});