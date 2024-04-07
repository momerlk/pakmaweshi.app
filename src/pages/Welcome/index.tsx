import React , {useState , useEffect} from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes";
import { WelcomeStyles } from "./styles";

import api from "../api"
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Welcome() {
  const navigation = useNavigation<StackTypes>();
  const styles = WelcomeStyles;
  return (
    <View>


        <Text style={styles.title}>
          Welcome To Pak Maweshi
        </Text>
        <Text style={styles.text}>Sign In or Sign Up to Continue</Text>

        <Button title="Sign In" onPress={() => navigation.navigate("SignIn")}/>
        <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")}/>
    </View>
  );
}
