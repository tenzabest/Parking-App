import React, { Component } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";import { CheckBox,ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

class SettingsScreen  extends Component {
  constructor(props){
    super(props)
    this.state = {
      classes : [
      { classe:"701",isChecked: false},
      { classe:"702",isChecked: false},
      { classe:"101",isChecked: false},
      { classe:"102",isChecked: false},
      { classe:"201",isChecked: false},
      { classe:"202",isChecked: false},
      { classe:"301",isChecked: false},
      { classe:"302",isChecked: false},
      { classe:"401",isChecked: false},
      { classe:"402",isChecked: false},
      { classe:"501",isChecked: false},
      { classe:"502",isChecked: false}, 
      { classe:"601",isChecked: false},
      { classe:"602",isChecked: false},
    ], 
    modalVisible: false,
    }
    
  }
  componentDidMount(){
   // this.props.parentCallBack(this.state.classes)
  }

  updateState  (index){
    let classes=this.state.classes;
      if(classes[index].isChecked===true){
        classes[index].isChecked=false
      }else{
        classes[index].isChecked=true
      }
         this.setState({classes:classes })
         this.props.parentCallBack(this.state.classes)
 

  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
 }

sendingData=()=>{

}
 
    
  render(){
    const { modalVisible } = this.state;

  return (
    <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }} 
        >  
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView>
              {
        this.state.classes.map((l, index) => (
        
              <CheckBox 
              checked={l.isChecked}
              title={l.classe}
              onPress={()=>this.updateState(index)}    
              />
        ))
      }
           </ScrollView>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible)
                  ;
                }}
              >
                <Text style={styles.textStyle}>Fermer</Text>
              </TouchableHighlight>
            </View>
          </View>
     
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Classes</Text>
        </TouchableHighlight>
      </View>
  );
}}

export default SettingsScreen

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});