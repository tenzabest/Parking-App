import React, { Component, useEffect, useState } from 'react';
import { View,ScrollView,StatusBar } from 'react-native';
import { firebase } from "../Setup"
import { ListItem } from 'react-native-elements'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Feather from 'react-native-vector-icons/Feather';
const Tab = createMaterialTopTabNavigator();

function ListStudentsInClass(props) {
  const [students, setStudents] = useState([]);
  const editUser = (index) => {
    firebase.database()
      .ref('Students/' + index)
      .update({ status: "Couloir" })

  }
  useEffect(() => {
    const userRef = firebase.database().ref('/Students');
    const OnLoadingListener = userRef.on('value', (snapshot) => {
      setStudents([]);
      snapshot.forEach(function (childSnapshot) {
        setStudents((students) => [...students, childSnapshot.val()]);
      });
    });



    return () => {
      userRef.off('value', OnLoadingListener);
    };
  }, []);

  const getClassToDisplay = (studentClasse) => {
    const classChecked = props.classeChecked;
    const foundValue = classChecked.find(element => element.classe === studentClasse);

    return !!foundValue ? foundValue.isChecked : false;
  }


  return (
    <ScrollView>
        <StatusBar backgroundColor='#009387' barStyle="light-content" />

      <View >
        {

          students.filter(student => student.status === props.value && getClassToDisplay(student.class)).map((student, index) => (
            <ListItem key={student.id} bottomDivider>

              <ListItem.Content>

                <ListItem.Title >{student.name} </ListItem.Title>

                <View style={{ flexDirection: "row" }}>
                  <ListItem.Subtitle style={{ fontWeight: 'bold' }}>{student.class}</ListItem.Subtitle>
                  {student.status === "Partis" ?
                    <View style={{ marginLeft: "80%" }}>

                      <Feather
                        name="corner-up-right"
                        color="black"
                        size={24}
                        onPress={() => editUser(student.id)}

                      /></View> : null}
                </View>
                <ListItem.Subtitle style={{ fontSize: 12 }}>{student.number} </ListItem.Subtitle>


              </ListItem.Content>
            </ListItem>
          ))

        }
      </View>
    </ScrollView>
  )
}




class StudentListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.sendingData
    }
  }
  render() {
    return (


      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: '#F8F8F8',
          style: {
            backgroundColor: '#009387',


          },
          labelStyle: {
            textAlign: 'center',
            fontSize: 15,
            margin: 18,
            padding: 0,

          },
          indicatorStyle: {
            borderBottomColor: 'black',
            borderBottomWidth: 3,
          },
        }}>

        <Tab.Screen
          name="FirstList"
          children={() => <ListStudentsInClass value="En classe" classeChecked={this.state.data} ></ListStudentsInClass>}
          options={{
            tabBarLabel: 'Classe',

          }}

        />
        <Tab.Screen
          name="SecondList"
          children={() => <ListStudentsInClass value="Partis" classeChecked={this.props.sendingData}></ListStudentsInClass>}
          options={{
            tabBarLabel: 'Partis',

          }} />
        <Tab.Screen
          name="ThirdList"
          children={() => <ListStudentsInClass value="Couloir" classeChecked={this.props.sendingData}></ListStudentsInClass>}
          options={{
            tabBarLabel: 'Couloir',

          }} />
      </Tab.Navigator>


    );
  }
}

export default StudentListScreen
