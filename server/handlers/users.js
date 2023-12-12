const db = require('../admin');

exports.users = async(req, res) => {
    console.log("In the USERS function");
    const usersRef = db.collection('users').doc('test-user').get()
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
            return res.status(404).json({ general: "Not found!" });
        } else {
            console.log('Document data:', doc.data());
            return res.status(201).json(doc.data());
        }
    })
    .catch(err => {
        return res.status(500).json({ general: "Something went wrong!" });
    });
}