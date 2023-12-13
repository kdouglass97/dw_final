// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDX7pQHfpzlUi0PKGx1HT7uJIX9RdfDanY",
    authDomain: "dwfinal-71fc9.firebaseapp.com",
    projectId: "dwfinal-71fc9",
    storageBucket: "dwfinal-71fc9.appspot.com",
    messagingSenderId: "809411425947",
    appId: "1:809411425947:web:67da8ae95ea9f611d6383e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export app
export default auth;