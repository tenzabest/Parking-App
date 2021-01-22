import React from 'react';
import {firebase} from "./Setup"

export const SignInUser = (email, passswod) => {

    return new Promise(function(resolve, reject) {
      firebase.auth()
        .signInWithEmailAndPassword(email, passswod)
        .then(() => {
          resolve('Sign In Successfully');
        })
        .catch(error => {         
          reject(error);
        });
    });
  };
  