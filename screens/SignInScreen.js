import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {firebase} from "../Setup"
import {SignInUser} from "../firebaseService"
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


class SignInScreen extends Component  {

    constructor(props){
        super(props);
        this.state = {
            emailAddress: "",
            password: "",
            user: "",
        }
    }

    componentDidMount() {
        const subscriber = firebase.auth().onAuthStateChanged(user => {
            this.state.user = user
        });
            
        return subscriber
    }
     
    render(){
        const signIn = () => {
            SignInUser(this.state.emailAddress, this.state.password)
                .then((data) => {
                    this.setState({emailAddress:"" , password: "", user: ""})
                    this.props.navigation.navigate('SenderScreen', { screen : 'Students' });
                })
                .catch((error) => {
                    alert("Nom de compte ou mot de passe incorrect!");
                }
            ); 
        };
    
        return (
            <View style={styles.container}>
                    <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Welcome !</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                    <FontAwesome 
                        name="user-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Your Username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={this.state.emailAddress}
                        onChangeText={text=>this.setState({...this.state,emailAddress:text})}
                    />
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                        />
                    </View>
                    <Text style={[styles.text_footer, {
                            marginTop: 35
                            }]}>
                            Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Your Password"                 
                        autoCapitalize="none"
                        style={styles.textInput}
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={text=>this.setState({...this.state,password:text})}


                    />
                    <Feather
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                </View>
                <View style={styles.button}>
            
                <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                    >
                        <TouchableOpacity                   
                            onPress= {signIn}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                                }]}>Sign In</Text>
                        </TouchableOpacity>
                </LinearGradient>
                </View>
            </View>
            </View>
            );
        }
    };
  
  export default SignInScreen;
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
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