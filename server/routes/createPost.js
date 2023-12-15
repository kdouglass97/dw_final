const express = require("express");
const router = express.Router();

// intialize firebase database
const firestore = require("firebase/firestore");

// create a reference to the database
const db = firestore.getFirestore();

async function addToArray(collectionName, docId, arrayFieldName, newElements) {
    const docRef = firestore.doc(db, collectionName, docId);
  
    try {
      await firestore.updateDoc(docRef, {
        [arrayFieldName]: firestore.arrayUnion(...newElements)
      });
      console.log("Array updated successfully");
    } catch (error) {
      console.error("Error updating array: ", error);
    }
  }

router.post("/", async (req,res) => {
    const queryParams = req.query; // query params from URL
    
    const title = queryParams.newPostTitle;
    const content = queryParams.newPostContent;
    const uid = queryParams.userId;
    const timeStamp = Date.now();

    //setting results of function to variable, so it allows setpost.then to be possible
    const setPost = await addToArray("users", uid, "postArray", 
    [{title: title, content: content, timeStamp: timeStamp}]);

    setPost
        .then(() => {
            res.status(201).json({message:"success"});
        })
        .catch((error) => {
            console.warn(error);
            res.status(500).send(`Error Submitting: ${error.toString()}`);
        })
});

module.exports = router;