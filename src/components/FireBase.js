import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAj9XeOVeWNuZvrWN-e15qFnelpiOTTKsc",
  authDomain: "assignment-9c9f5.firebaseapp.com",
  projectId: "assignment-9c9f5",
  storageBucket: "assignment-9c9f5.appspot.com",
  messagingSenderId: "749079550356",
  appId: "1:749079550356:web:4fc31f7a56937c0603d781"
};
  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();
