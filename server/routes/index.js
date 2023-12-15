const express = require("express");
const router = express.Router();

// intialize firebase database
const firestore = require("firebase/firestore");
// create a reference to the database
const db = firestore.getFirestore();

router.get("/", (req, res) => {
    const usersRef = firestore.getDocs(firestore.collection(db, "users"));
    const usersArray = [];

    usersRef
        .then((response) => {
            response.forEach((user) => {
                usersArray.push({username: user.username, ...user.data()});
            });
            res.send(usersArray);
        })
        .catch(err => {
            res.status(500).json({ general: "Something went wrong!" });
        });
});

const moosePostRoute = require('./getMoose');
router.use("/getMoose", moosePostRoute);
const createUserRoute = require('./createUser');
router.use("/createUser", createUserRoute);
const createPostRoute = require('./createPost');
router.use("/createPost", createPostRoute);

module.exports = router;