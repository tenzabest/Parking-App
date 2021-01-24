import React,{Component} from 'react';
import firebase from 'firebase';
import Auth from "firebase/auth";
var firebaseConfig = {
    apiKey: "AIzaSyAMTEy29RAkj_nEX6wFNVgSoZbhMjtqhe0",
    authDomain: "testfirebase1-b64dc.firebaseapp.com",
    databaseURL: "https://testfirebase1-b64dc-default-rtdb.firebaseio.com",
    projectId: "testfirebase1-b64dc",
    storageBucket: "testfirebase1-b64dc.appspot.com",
    messagingSenderId: "968062782796",
    appId: "1:968062782796:web:1b35ab835051141ce893e9"
  };
    
    // Initialize Firebase
   if(!firebase.apps.length){
          this.app=firebase.initializeApp(firebaseConfig); 
        }
       
export {firebase,Auth}

    