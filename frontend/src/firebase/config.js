import firebase from 'firebase/app';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCvUMqGz9ZB_7dBOnj1-5O4Kuvwrcpkemg",
    authDomain: "jossicstorage.firebaseapp.com",
    databaseURL: "https://jossicstorage.firebaseio.com",
    projectId: "jossicstorage",
    storageBucket: "jossicstorage.appspot.com",
    messagingSenderId: "534548717819",
    appId: "1:534548717819:web:c30cbaa4a0e8ade9b0905e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}