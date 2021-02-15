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

export const SignOutUser = () => {
  return new Promise(function (resolve, reject) {
    firebase.auth()
      .signOut()
      .then(() => {
        resolve('Sign Out Successfully');
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updateStudent = (dataScanned) => {
  return new Promise(function (resolve, reject) {
    firebase.database().ref('Students').once('value', (snapshot) => {
      for (let index = 0; index < Object.keys(snapshot.val()).length; index++) {
        if (snapshot.val()[index].number === dataScanned) {
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



