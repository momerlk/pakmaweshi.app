import React , {useState , useEffect} from "react";
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
import { StackTypes } from "../../routes";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import {SearchBar} from "../util"

const Tab = createBottomTabNavigator()

const styles = SignInStyles;




export default function () {
  const navigation = useNavigation<StackTypes>();
  const [clicked , setClicked] = useState(false)

  return (
    <View style={{...styles.container}} >
      <SearchBar clicked={clicked} setClicked={setClicked} placeholder={"Search Messages"}/>
      <ScrollView style={{...styles.container , backgroundColor : "white"}}>

      </ScrollView>
    </View>
  );
}

