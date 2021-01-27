import React,{Component} from 'react';
import { Text, View,Button ,StyleSheet,ScrollView} from 'react-native';
import {firebase} from "../Setup"
import { ListItem} from 'react-native-elements'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createMaterialTopTabNavigator();
function ListStudentsInClass (){
  

  const [students, setStudents] = React.useState([]);
  




  
  
  

  return(
   <ScrollView>
      <View >
        
        {
          
         students.map((students, index) => (
            <ListItem key={index} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{students.name}</ListItem.Title>
               
               <ListItem.Subtitle>{students.Status}</ListItem.Subtitle>
                 <View >
                <Feather
                          name="eye-off"
                          color="grey"
                          size={20}
                          onPress={()=>editUser(index)}
                      /></View>
              </ListItem.Content>
            </ListItem>
          )) 
        }
      </View>
      </ScrollView>
  )
  }
const SecondPage =()=>{
  
  return(
    <View style={styles.container}>
    <Text>
    Screen 2

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
            fontSize: 16,
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
          component={ListStudentsInClass}
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
  header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50
  },
  footer: {
      flex: 3,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30
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
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
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
  //  {/* {this.state.students.filter(student => student.isGoing===false).map(filteredPerson => (
  //         <Text>
  //                  {filteredPerson.name}
     
  //         </Text> 
  //         ))} */}