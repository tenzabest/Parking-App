import React, { Component,useEffect,useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView, } from 'react-native';
import { firebase } from "../Setup"
import { ListItem, Header } from 'react-native-elements'
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

    const childChangedListener = userRef.on('child_changed', (snapshot) => {
      // Set Your Functioanlity Whatever you want.

      // alert('Child Updated');
    });

    return () => {
      userRef.off('value', OnLoadingListener);
      userRef.off('child_changed', childChangedListener);

    };
  }, []);

  const getClassToDisplay = (studentClasse) => {
    const classChecked = props.classeChecked;
    const foundValue = classChecked.find(element => element.classe === studentClasse);
    return !!foundValue ? foundValue.isChecked : false;

  }


  return (
    <ScrollView>
      <View >

        <View >
          {

            students.filter(student => student.status === props.value && getClassToDisplay(student.class)).map((student, index) => (
              <ListItem key={student.id} bottomDivider>

                <ListItem.Content>

                  <ListItem.Title >{student.name} </ListItem.Title>

                  <View style={{ flexDirection: "row" }}>
                    <ListItem.Subtitle style={{ fontWeight: 'bold' }}>{student.class}</ListItem.Subtitle>
                    {student.status === "En classe" ?
                      <View style={{ marginLeft: "80%" }}>

                        <Feather
                          name="corner-up-right"
                          color="black"
                          size={20}
                          onPress={() => editUser(student.id)}

                        /></View> : null}
                  </View>
                  <ListItem.Subtitle style={{ fontSize: 12 }}>{student.number} </ListItem.Subtitle>


                </ListItem.Content>
              </ListItem>
            ))

          }
        </View>
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
            fontSize: 16,
            margin: 18,
            padding: 0,

          },
          indicatorStyle: {
            borderBottomColor: 'black',
            borderBottomWidth: 3,
          },
        }}>

        <Tab.Screen
          name="FirstPage"
          children={() => <ListStudentsInClass value="En classe" classeChecked={this.state.data} ></ListStudentsInClass>}
          options={{
            tabBarLabel: 'Classe',

          }}

        />
        <Tab.Screen
          name="SecondPage"
          children={() => <ListStudentsInClass value="Couloir" classeChecked={this.props.sendingData}></ListStudentsInClass>}
          options={{
            tabBarLabel: 'Couloir',

          }} />
      </Tab.Navigator>


    );
  }
}

export default StudentListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    //  alignItems: 'center',
    // justifyContent: 'center',
    // marginTop:"3%",

  },
  header: {
    flex: 1,
    justifyContent: 'center',
    // paddingHorizontal: 10,
    //paddingTop: 50,
    backgroundColor: "red"
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 60,

  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
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
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
