import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBBloWNye8-VGjpEnY3YQRcMUnzMXwVbCY",
  authDomain: "testfirebase3-7e7b4.firebaseapp.com",
  projectId: "testfirebase3-7e7b4",
  storageBucket: "testfirebase3-7e7b4.appspot.com",
  messagingSenderId: "623069687332",
  appId: "1:623069687332:web:c6dfc8071831e0734df2b1"
};
 
// Initialize Firebase
if(!firebase.apps.length){
  this.app=firebase.initializeApp(firebaseConfig); 
}
       
export {firebase}

    