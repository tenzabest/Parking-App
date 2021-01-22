import React,{Component} from 'react';
import { Text, View,Button } from 'react-native';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAMTEy29RAkj_nEX6wFNVgSoZbhMjtqhe0",
  authDomain: "testfirebase1-b64dc.firebaseapp.com",
  databaseURL: "https://testfirebase1-b64dc-default-rtdb.firebaseio.com",
  projectId: "testfirebase1-b64dc",
  storageBucket: "testfirebase1-b64dc.appspot.com",
  messagingSenderId: "968062782796",
  appId: "1:968062782796:web:1b35ab835051141ce893e9"
};
  
  // Initialize Firebase
 
     
  
  class StudentListScreen extends Component  {
    constructor(){
      super();
      if(!firebase.apps.length){
        this.app=firebase.initializeApp(firebaseConfig);

      }
      // this.database=this.app.database().ref("Students")
      firebase.database().ref('Students').on('value',snap=>{
    
        this.state ={
      students:snap.val()
    }
  }) 
    }
 componentDidUpdate(){


 


} 
    render(){
      return (
       
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
 coucou  
{this.state.students[0].name}
Hello
      </Text>
    </View>
  );
}}

export default StudentListScreen