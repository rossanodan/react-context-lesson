import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDJzNPK_kv1rfSDT2uO0725BMaHXHT_IMI",
  authDomain: "crwn-clothing-eee33.firebaseapp.com",
  databaseURL: "https://crwn-clothing-eee33.firebaseio.com",
  projectId: "crwn-clothing-eee33",
  storageBucket: "crwn-clothing-eee33.appspot.com",
  messagingSenderId: "708341539239",
  appId: "1:708341539239:web:68212a586f5d2f21a4d682",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
