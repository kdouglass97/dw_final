const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyDX7pQHfpzlUi0PKGx1HT7uJIX9RdfDanY",
    authDomain: "dwfinal-71fc9.firebaseapp.com",
    projectId: "dwfinal-71fc9",
    storageBucket: "dwfinal-71fc9.appspot.com",
    messagingSenderId: "809411425947",
    appId: "1:809411425947:web:67da8ae95ea9f611d6383e"
  };

//initialize the firebase app
firebase.initializeApp(firebaseConfig); 
//export app
module.exports = { firebase };

