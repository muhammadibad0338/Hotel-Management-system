import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const app = firebase.initializeApp({
    apiKey: "AIzaSyCK2zlb4zPIG6PdH_i1NNP_CDPZ6exjUCQ",
    authDomain: "facebook-clone-40392.firebaseapp.com",
    projectId: "facebook-clone-40392",
    storageBucket: "facebook-clone-40392.appspot.com",
    messagingSenderId: "109702755436",
    appId: "1:109702755436:web:774b614fc0023b88945449",
})

export const auth = app.auth()
export const db = app.firestore();
export default app