import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View, TextInput, Button, Keyboard, TouchableWithoutFeedback
} from "react-native"; import { CheckBox, ListItem } from 'react-native-elements'
import { Header } from 'react-native-elements';
import { firebase } from "../Setup"
import { updateStudent, SignOutUser } from "../firebaseService"

import * as SecureStore from 'expo-secure-store';

class SettingsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: [
        { classe: "701", isChecked: true },
        { classe: "702", isChecked: true },
        { classe: "101", isChecked: true },
        { classe: "102", isChecked: true },
        { classe: "201", isChecked: true },
        { classe: "202", isChecked: true },
        { classe: "301", isChecked: true },
        { classe: "302", isChecked: true },
        { classe: "401", isChecked: true },
        { classe: "402", isChecked: true },
        { classe: "501", isChecked: true },
        { classe: "502", isChecked: true },
        { classe: "601", isChecked: true },
        { classe: "602", isChecked: true },
      ],
      numero: ""
    }

  }
  componentDidMount() {
    this.props.parentCallBack(this.state.classes)
  
  }

  updateState(index) {
    let classes = this.state.classes;
    if (classes[index].isChecked === true) {
      classes[index].isChecked = false
    } else {
      classes[index].isChecked = true
    }
    this.setState({ classes: classes })
<<<<<<< HEAD

 


=======
    this.props.parentCallBack(this.state.classes)
>>>>>>> c59f7228a4c28f9e7b0644a939e85e0347fa83be
  }

  render() {

    const logout = () => {
        SignOutUser(this.state.emailAddress, this.state.password)
            .then((data) => {
              this.props.nav.navigate('SignIn');
            })
            .catch((error) => {
              console.log("An error occured : ", error);
              alert("An error occured : ", error);
            }
        ); 
    };

    const addStudent = () => {
      let temp = this.state.numero
      if (this.state.numero.length === 1) {
        temp = "00" + this.state.numero
      } else if (this.state.numero.length === 2) {
        temp = "0" + this.state.numero

      }
      updateStudent(temp)
        .then((result) => {

        })
        .catch((error) => {
          console.log(error);
        });


      this.setState({ numero: "" })
    }
    const resetAllUsers = () => {

      for (let index = 0; index < 11; index++) {
        firebase.database()
          .ref('Students/' + index)
          .update({ status: "En classe" })
      }
    }
    const alertReset = () => {
      Alert.alert(
        'Attention !',
        'Etes-vous sur de vouloir reinitialiser tout les eleves ?',
        [
          {
            text: 'Oui',
            onPress: resetAllUsers,
          },
          {
            text: 'Non',
            onPress: () => console.log('NON'),
            style: 'cancel'
          },

        ],
        { cancelable: false }
      )
    }

    return (
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

        <View >
          <Header
            leftComponent={{ icon: 'sync', color: 'black', onPress: alertReset }}
            centerComponent={{ text: 'Parametres', style: { color: 'black' } }}
            rightComponent={{ icon: 'logout', color: 'black', onPress: logout }}
            backgroundColor="white"
          />

          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 15, marginTop: 15, marginLeft: 15 }}>
            <TextInput
              placeholder="Ajouter un élève"
              style={styles.textInput}
              autoCapitalize="none"
              value={this.state.numero}
              onChangeText={text => this.setState({ numero: text })}
              keyboardType="numeric"
            />
            <Button title="Ajouter" onPress={addStudent}></Button>
          </View>
          {/* <View style={styles.title}>
          <Text style={{ fontSize: 20 }}>Filtre par classe</Text>
        </View> */}
          <View style={styles.container}>

            {
              this.state.classes.map((l, index) => (
                <View style={styles.item} key={index}>
                  <CheckBox
                    checked={l.isChecked}
                    title={l.classe}
                    onPress={() => this.updateState(index)}
                  /></View>
              ))

            }

          </View></View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SettingsScreen
const styles = StyleSheet.create({
  container: {
    // /flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    alignItems: 'flex-start'
  },
  title: {
    width: "100%",
    height: "18%",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor:"grey"
  }, textInput: {
    // flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    // paddingLeft:
    color: '#05375a',
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    width: "70%",
    height: 40,

  },
  item: {
    width: '40%',
    marginHorizontal: 18,
    marginBottom: 6
  }, button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    height: 60,
    width: 300,
    justifyContent: "center",
    borderRadius: 20,
  },
})
