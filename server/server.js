/* IMPORTS */
// express
const express = require("express"); 
const app = express();
//cors (for cross-origin access)
const cors = require("cors");
//firebase (for acccessing the database)
const admin = require('firebase-admin');
const serviceAccount = require("./firebase-credentials.json");
// local ports
const PORT = 4000;

/* SETUP */
// allow cross-origin so the server can commmunicate with the client
app.use(cors());
// establish a connection with firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
// get a reference to the database
const db = admin.firestore();

/* PAGE SETUP */

/* for ROOT (/) */
app.get("/", (req,res) => {
    res.json({message: "Hello world",moose:["mike","joe","xiao"]});
});

/* for /USERS */
// fetch the user data
let users = async(req, res) => {
    const usersRef = db.collection('users').doc('test-user').get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            res.status(404).json({ general: "Not found!" });
        } else {
            // can extract a specific field, such as doc.data().posts
            console.log('Document data:', doc.data());
            res.status(201).json(doc.data());
        }
    })
    .catch(err => {
        res.status(500).json({ general: "Something went wrong!" });
    });
}
// populate our server page with the data
app.get("/users", users);

/* RUNNING */
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

//export default app; // causes compilation errors
