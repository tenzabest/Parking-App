import React,{Component} from 'react';
import { Text, View,Button ,StyleSheet} from 'react-native';
import {firebase} from "../Setup"
import { ListItem} from 'react-native-elements'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const FirstPage =()=>{
return(
  <View style={styles.container}>
    <Text>
    Ecran 1 

    </Text>
  </View>
)
}
const SecondPage =()=>{
  return(
    <View style={styles.container}>
    <Text>
    Ecran 2

    </Text>
  </View>
  )
  }
  const ecranTrois =()=>{
    return(
      <View style={styles.container}>
      <Text>
      Ecran 3
  
      </Text>
    </View>
    )
    }
  class StudentListScreen extends Component  {
    constructor(){
      super();
      
      // this.database=this.app.database().ref("Students")
      firebase.database().ref('Students').on('value',snap=>{
        this.state ={
      students:snap.val()
    }
  }) 
    }
    componentDidMount (){
 
    }

    render(){
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
    margin: 0,
    padding: 0,
          },
          indicatorStyle: {
            borderBottomColor: 'black',
            borderBottomWidth: 3,
          },
        }}>
        <Tab.Screen
          name="FirstPage"
          component={FirstPage}
          options={{
            tabBarLabel: 'Home',
         
          }}  />
        <Tab.Screen
          name="SecondPage"
          component={SecondPage}
          options={{
            tabBarLabel: 'Setting',
          
          }} />
      </Tab.Navigator>

  );
}}

export default StudentListScreen 

// {/* {this.state.students[0].name} */}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  //  {/* {this.state.students.filter(student => student.isGoing===false).map(filteredPerson => (
  //         <Text>
  //                  {filteredPerson.name}
     
  //         </Text> 
  //         ))} */}