import React, { Component } from 'react';
import { Alert, StyleSheet, View, TextInput, Button, Keyboard, TouchableWithoutFeedback } from "react-native";
import { CheckBox } from 'react-native-elements'
import { Header } from 'react-native-elements';
import { firebase } from "../Setup"
import { updateStudent, SignOutUser } from "../firebaseService"
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      number: ""
    }

  }
  storeData = async () => {
    try {
      const jsonValue = JSON.stringify(this.state.classes)
      await AsyncStorage.setItem('classes', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('classes')
      if(JSON.parse(jsonValue) !== null){
        this.setState({ classes: JSON.parse(jsonValue) })
        this.props.parentCallBack(this.state.classes)
      }
    } catch (e) {
      console.log(e)
    }
  }
  componentDidMount() {
    this.getData();

  }

  updateState(index) {
    let classes = this.state.classes;
    if (classes[index].isChecked === true) {
      classes[index].isChecked = false
    } else {
      classes[index].isChecked = true
    }
    this.setState({ classes: classes })

    this.props.parentCallBack(this.state.classes)

    this.storeData()
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
      let temp = this.state.number
      if (this.state.number.length === 1) {
        temp = "00" + this.state.number
      } else if (this.state.number.length === 2) {
        temp = "0" + this.state.number

      }
      updateStudent(temp)
        .catch((error) => {
          console.log(error);
        });


      this.setState({ number: "" })
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
              value={this.state.number}
              onChangeText={text => this.setState({ number: text })}
              keyboardType="numeric"
            />
            <Button title="Ajouter" onPress={addStudent}></Button>
          </View>

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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    alignItems: 'flex-start'
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -12,
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
  },
})
