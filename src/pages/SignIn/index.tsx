import React from "react";
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

const styles = SignInStyles;

export function SignIn() {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.header}>
        <Text style={styles.message}>Sign In to your Pak Maweshi Account</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput placeholder="Enter your email or username" style={styles.input} />
        <Text style={styles.title}>Password</Text>
        <TextInput placeholder="Enter your password" secureTextEntry={true} style={styles.input} />

        <TouchableOpacity style={styles.button}
          onPress={() => {
            navigation.replace("Home")
          }} 
        >
          <Text style={styles.buttonText}>Sign in</Text>
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
