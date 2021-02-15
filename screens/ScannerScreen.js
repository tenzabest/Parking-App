import React, { Component } from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { updateStudent } from "../firebaseService"

class ScannerScreen extends Component {

  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

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
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
     this.setState({ scanned: true });
        let temp = data
    if (data.length === 1) {
      temp = "00" + data
    } else if (data.length === 2) {
      temp = "0" + data

    }
  
    updateStudent(temp)
      .catch((error) => {
        console.log(error);
      });
  
  setTimeout(()=>{
    this.setState({ scanned: false });
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
});
export default ScannerScreen