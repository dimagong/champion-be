// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import config from "./../config.js"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebase = initializeApp(config.firebaseConfig) //initialize firebase app
//const analytics = getAnalytics(firebase)
export const db = getFirestore(firebase)

//export default firebase //export the app
