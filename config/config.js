import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBvPEyJ8Rr09ZeilJF4AglJeEVaAWuAbIc",
    authDomain: "stake-everything.firebaseapp.com",
    databaseURL: "https://stake-everything-default-rtdb.firebaseio.com",
    projectId: "stake-everything",
    storageBucket: "stake-everything.appspot.com",
    messagingSenderId: "491120040265",
    appId: "1:491120040265:web:a91c6eb32f5ccdca53a298",
    measurementId: "G-67PJN7ZPQC"
  };

let fb;

if (!firebase.apps.length){
  fb = firebase.initializeApp(firebaseConfig);
}
else{
  fb = firebase.app();
}
// const fb = firebase.initializeApp(firebaseConfig);
let db = firebase.database();

export {fb,db};