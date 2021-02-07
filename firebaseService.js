import React from 'react';
import { firebase } from "./Setup"

export const SignInUser = (email, passswod) => {

  return new Promise(function (resolve, reject) {
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
export const updateStudent = (data) => {
  return new Promise(function (resolve, reject) {
    firebase.database().ref('Students').on('value', (snapshot) => {
      for (let index = 0; index < Object.keys(snapshot.val()).length; index++) {
      //console.log("da :" , data)
        if (snapshot.val()[index].number === data) {
          firebase.database()
            .ref('Students/' + index)
            .update({ status: "En classe" })
            .then(snapshot => {
              resolve(snapshot);
            })
            .catch(err => {
              reject(err);
            });
        }
      }

    })


  });
};
