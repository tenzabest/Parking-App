import React,{Component} from 'react';
import { Text, View,Button } from 'react-native';
import {firebase} from "../Setup"
  
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