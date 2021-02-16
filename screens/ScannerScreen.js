import React, { Component } from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { updateStudent } from "../firebaseService"

class ScannerScreen extends Component {

  state = {
    hasCameraPermission: null,
    scanned: false,
    modalVisible: false,
    data:""
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { hasCameraPermission, scanned,modalVisible,data } = this.state;
    

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (

      <View style={styles.container}>

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}

          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Le numero {this.state.data} a été scanné</Text>

              </View>
            </View>
          </Modal>

        </View>
      </View>
    );
  }

  handleBarCodeScanned = ({data }) => {
    this.setState({ scanned: true ,data:data});
    let temp = data
    if (data.length === 1) {
      temp = "00" + data
    } else if (data.length === 2) {
      temp = "0" + data

    }
    
    this.setModalVisible(true)
    updateStudent(temp)
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
      this.setState({ scanned: false });
      this.setModalVisible(false)
    }, 1500);
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
export default ScannerScreen