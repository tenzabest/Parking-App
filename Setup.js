import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAfmu9tu6ZQuL-BwPwvBsCPN6bZHO29fWc",
  authDomain: "parking-app-22757.firebaseapp.com",
  databaseURL: "https://parking-app-22757-default-rtdb.firebaseio.com",
  projectId: "parking-app-22757",
  storageBucket: "parking-app-22757.appspot.com",
  messagingSenderId: "164860668161",
  appId: "1:164860668161:web:e0db0a1857bb4ac9355300"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase }

