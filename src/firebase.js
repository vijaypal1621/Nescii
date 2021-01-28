// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpHka5Ds0hYWx7VBydbxSNDO9vnGntrF0",
  authDomain: "nescii-101.firebaseapp.com",
  projectId: "nescii-101",
  storageBucket: "nescii-101.appspot.com",
  messagingSenderId: "459990773032",
  appId: "1:459990773032:web:f9e99705620d1f53cf341d",
  measurementId: "G-LWMQTH94P1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth,provider,db, storage};
export default db;
