import firebase from "firebase/app";

import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions"; // for cloud functions

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: process.env.REACT_APP_AUTH,
  databaseURL: process.env.REACT_APP_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE,
  messagingSenderId: process.env.REACT_APP_MESSAGING,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MSMT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const dbs = firebaseApp.firestore();
const auths = firebase.auth();
const providers = new firebase.auth.GoogleAuthProvider();

export { auths, providers };
export default dbs;
