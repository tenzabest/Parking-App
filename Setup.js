import React,{Component} from 'react';
import firebase from 'firebase';
import Auth from "firebase/auth";
var firebaseConfig = {
  //Firebase Config
  };
    
    // Initialize Firebase
   if(!firebase.apps.length){
          this.app=firebase.initializeApp(firebaseConfig);
  
        }
       
        export {firebase,Auth}

    