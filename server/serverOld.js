/* IMPORTS */
// express
const express = require("express"); 
const app = express();
//cors (for cross-origin access)
const cors = require("cors");
//firebase (for acccessing the database)
const admin = require('firebase-admin');
const serviceAccount = require("./firebase-config");
// local ports
const PORT = 4000;

/* SETUP */
// allow cross-origin so the server can commmunicate with the client
app.use(cors());
// added while troubleshooting empty req.body -- broke everything though hmm
// app.use(express.static(path.join(__dirname, 'public')));

// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(express.json());

// parse incoming Request Object if object, with nested objects, or generally any type.
//app.use(express.urlencoded({ extended: true }));

// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: false }));

// establish a connection with firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    /*databaseURL: "dwfinal-71fc9.firebasio.com"*/
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

app.post("/createUser", async (req, res) => {
    //TO DO: why is req empty??? We need req.body.userId >__>
    await db.collection('users').doc(req.body.userId).set({}, {merge: true})
    .then(doc => {
        if (!doc.exists) {
            res.status(404).json({ general: "Failed to create a new user!" });
        } else {
            // can extract a specific field, such as doc.data().posts
            console.log('Document data:', doc.data());
            res.status(201).json(doc.data());
        }
    })
    .catch(err => {
        res.status(500).json({ general: "Something went wrong!" });
    });
});

/* RUNNING */
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

//export default app; // causes compilation errors
