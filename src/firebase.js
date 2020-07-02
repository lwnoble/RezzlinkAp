import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDu8jtW5OfAI0EQYHVS_hbxwz5PbYb1gxc",
  authDomain: "rezzlink-182ff.firebaseapp.com",
  databaseURL: "https://rezzlink-182ff.firebaseio.com",
  projectId: "rezzlink-182ff",
  storageBucket: "rezzlink-182ff.appspot.com",
  messagingSenderId: "176242892731",
  appId: "1:176242892731:web:81ab8764c957dcfd34ae9e",
  measurementId: "G-1S5JS5KM44"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL, status, phone, first, middle, last } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        status,
        phone,
        first,
        middle,
        last
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
