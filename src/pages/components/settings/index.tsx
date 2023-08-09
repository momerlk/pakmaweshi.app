import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SignInStyles } from "./styles";
import { StackTypes } from "../../../routes";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

const styles = SignInStyles;

export default function () {
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={styles.container} >
      <Text>SETTINGS</Text>
    </View>
  );
}

