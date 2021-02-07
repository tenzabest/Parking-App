import React from 'react';
import { firebase } from "./Setup"

export const SignInUser = (email, passswod) => {

<<<<<<< HEAD
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
=======
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
  
  export const updateStudent = (dataScanned) => {
    return new Promise(function(resolve, reject) {
      firebase.database().ref('Students').on('value', (snapshot) =>{
        for (let index = 0; index < Object.keys(snapshot.val()).length; index++) {
       if(snapshot.val()[index].number===dataScanned){
>>>>>>> 75b122d7b86e989b5ca77c2967253e04d0278eba
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
<<<<<<< HEAD


  });
};
=======
    });
  };
>>>>>>> 75b122d7b86e989b5ca77c2967253e04d0278eba
