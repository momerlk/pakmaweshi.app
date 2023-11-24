import React  , {useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SignInStyles } from "./styles";
import { StackTypes } from "../../routes";
import { useNavigation } from "@react-navigation/native";
import api from "../api"
import AsyncStorage from '@react-native-async-storage/async-storage';



const styles = SignInStyles;

export function SignIn() {
  const navigation = useNavigation<StackTypes>();

  const [log , setLog] = useState("")
  const [password , setPassword] = useState("")

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.header}>
        <Text style={styles.message}>Sign In to your Pak Maweshi Account</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Number</Text>
        <TextInput placeholder="Enter your number or email/username" style={styles.input} inputMode="email" 
        value={log} onChangeText={v => setLog(v)}/>
        <Text style={styles.title}>Password</Text>
        <TextInput placeholder="Enter your password" secureTextEntry={true} style={styles.input} onChangeText={v => setPassword(v)}/>

        <TouchableOpacity style={styles.button}
          onPress={async () => {

            let resp = await api.users.signIn({
              username_email : log,
              password : password
            })
            if (resp.status === 200){
              try {
                await AsyncStorage.setItem('token' , resp.token)
                alert(`successfully signed in!`)
              } catch (e){
                alert(`failed to sign in local storage not working!`)
              }
              navigation.replace("Home")
            } else {
              alert(`failed to sign in with status code = ${resp.status}`)
            }
          }} 
        >
          <Text style={styles.buttonText} >Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text
            style={styles.registerButtonText}
            onPress={() => {
              navigation.navigate("SignUp")
            }}
          >
            Dont have an account ? Sign up
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
