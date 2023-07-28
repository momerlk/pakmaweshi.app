import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { StackTypes } from "../../routes";
import { WelcomeStyles } from "./styles";

export function Welcome() {
  const navigation = useNavigation<StackTypes>();

  const styles = WelcomeStyles;
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          source={require("../../assets/logo.png")}
          style={{ width: "90%" }}
          resizeMode="contain"
          animation="flipInY"
        />
      </View>
      <Animatable.View
        animation="fadeInUp"
        delay={1000}
        style={styles.containerForm}
      >
        <Text style={styles.title}>
          Welcome To Pak Maweshi
        </Text>
        <Text style={styles.text}>Sign In or Sign Up to Continue</Text>
       
        <TouchableOpacity style={styles.button2}
        onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.buttonText}
          >Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
