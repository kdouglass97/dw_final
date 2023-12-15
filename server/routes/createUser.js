const express = require("express");
const router = express.Router();

// intialize firebase database
const firestore = require("firebase/firestore");
// create a reference to the database
const db = firestore.getFirestore();

router.post("/", async (req, res) => {
    const queryParams = req.query;
    const userId = queryParams.userId;
    const username = queryParams.username;
    const posts = [];

    const createNewUser = firestore.setDoc(firestore.doc(db, "users", userId),{
        username: username,
        uid: userId,
        postArray: posts   
    }, {merge: true});

    createNewUser
        .then(() => {
            res.status(201);
        })
        .catch((error) => {
            console.warn(error);
            res.status(500).json({ general: "Something went wrong!" });
        });
});

module.exports = router;