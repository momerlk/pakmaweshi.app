import React , {useState , useEffect} from "react";
import { Text, View,StyleSheet , TouchableOpacity, Dimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes";
import { WelcomeStyles } from "./styles";

import logo from "./logo.png"
import api from "../api"

const width = Dimensions.get('window').width

const vspacer = (val : number) => <View style={{marginVertical : val}}></View>;

const Button = (props : any) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.btnContainerStyle}>
        <Text style={styles.btnTextStyle}> {props.text} </Text>
      </View>
    </TouchableOpacity>
  )
}

export function Welcome() {
  const navigation = useNavigation<StackTypes>();
  const styles = WelcomeStyles;
  return (
    <View style={{backgroundColor : "white" , height : 2000}}>

        <Image source={logo} style={{height : 250, width : 350 , alignSelf : 'center'}}></Image>


        <View style={{
          marginHorizontal : 50,

        }}>
        <Text style={{fontSize : 17, color : "gray"}}>Sign In or Sign Up to Continue</Text>
        {vspacer(20)}
        <Button text="Sign In" onPress={() => navigation.navigate("SignIn")}/>
        {vspacer(20)}
        <Button text="Sign Up" onPress={() => navigation.navigate("SignUp")}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainerStyle: {
    backgroundColor: '#3F51B5',
    paddingVertical: 20,
    width: width / 1.3,
    borderRadius: 5
  },
  btnTextStyle: {
    color: '#ffffff',
    fontSize: 16,
    textTransform: 'uppercase',
    textAlign: 'center',
  }
})