import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View
} from "react-native"; import { CheckBox, ListItem } from 'react-native-elements'
import { Header } from 'react-native-elements';
import { firebase } from "../Setup"

class SettingsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      classes: [
        { classe: "701", isChecked: false },
        { classe: "702", isChecked: false },
        { classe: "101", isChecked: false },
        { classe: "102", isChecked: false },
        { classe: "201", isChecked: false },
        { classe: "202", isChecked: false },
        { classe: "301", isChecked: false },
        { classe: "302", isChecked: false },
        { classe: "401", isChecked: false },
        { classe: "402", isChecked: false },
        { classe: "501", isChecked: false },
        { classe: "502", isChecked: false },
        { classe: "601", isChecked: false },
        { classe: "602", isChecked: false },
      ],
      modalVisible: false,
    }

  }
  componentDidMount() {
    // this.props.parentCallBack(this.state.classes)
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


  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
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

      <View >
        <Header
          leftComponent={{ icon: 'sync', color: 'black', onPress: alertReset }}
          centerComponent={{ text: 'Parametres', style: { color: 'black' } }}
          rightComponent={{ icon: 'logout', color: 'black', onPress: () => alert("xouxou") }}
          backgroundColor="white"
        />
        <View style={styles.title}>
          <Text style={{ fontSize: 20 }}>Filtre par classe</Text>
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

    );
  }
}

export default SettingsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    alignItems: 'flex-start'
  },
  title: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width: '40%',
    marginHorizontal: 18,
    marginBottom: 10
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
