import React,{Component} from 'react';
import { Text, View,Button ,StyleSheet,ScrollView} from 'react-native';
import {firebase} from "../Setup"
import { ListItem} from 'react-native-elements'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createMaterialTopTabNavigator();

function ListStudentsInClass (props){

  const [students, setStudents] = React.useState([]);

  const editUser = (index) => {
    
firebase.database()
.ref('Students/' + index)
.update({Status: "Couloir"})

}
  React.useEffect(() => {
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
  
  const getClassToDisplay=(c)=>{
 const classeIsChecked=props.classeChecked;
      const foundValue=classeIsChecked.find(element => element.classe===c);
   //  !!foundValue? alert(foundValue.classe+' '+foundValue.isChecked):null;

  return !!foundValue?foundValue.isChecked:false;

  }
 
  return(
   <ScrollView>
      <View >
        {
         students.filter(students=>students.status===props.value && getClassToDisplay(students.class)).map((students, index) => (
              <ListItem key={students.id} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{students.name}</ListItem.Title>
                  <ListItem.Subtitle>{students.number}</ListItem.Subtitle>
                  <ListItem.Subtitle>{students.class}</ListItem.Subtitle>
                 <View >
                <Feather
                          name="corner-up-right"
                          color="grey"
                          size={20}
                          onPress={()=> editUser(students.id)}
                      /></View>
                </ListItem.Content>
              </ListItem>
          )) 
        }
      </View>
      </ScrollView>
  )
  }



  class StudentListScreen extends Component  {
    constructor(props){
      super(props);
      this.state={
        data:this.props.sendingData
      }
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
          children={()=><ListStudentsInClass value ="En classe" classeChecked={this.props.sendingData} ></ListStudentsInClass>}
          options={{
            tabBarLabel: 'Classe',
         
          }}  />
        <Tab.Screen
          name="SecondPage"
          children={()=><ListStudentsInClass value ="Couloir" classeChecked={this.props.sendingData}></ListStudentsInClass>}
          options={{
            tabBarLabel: 'Couloir',
          
          }} />
      </Tab.Navigator>
     

  );
}}

  export default StudentListScreen 

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
