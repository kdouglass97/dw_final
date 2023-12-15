const express = require("express");
const router = express.Router();

// intialize firebase database
const firestore = require("firebase/firestore");
// create a reference to the database
const db = firestore.getFirestore();

router.get("/", (req, res) => {
    const userRef = firestore.getDoc(firestore.doc(db, "users", req.query.uId));

    userRef
        .then((user) => {
            res.status(201).send({username: user.username, ...user.data()});
        })
        .catch(err => {
            res.status(500).json({ general: "Something went wrong!" });
        });
});

module.exports = router;