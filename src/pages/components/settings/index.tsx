import React , {useState , useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SignInStyles } from "./styles";
import { StackTypes } from "../../../routes";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import api from "../../api"
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator()

const styles = SignInStyles;

export default function () {
  const navigation = useNavigation<StackTypes>();
  const [avatar , setAvatar] = useState("...")
  const [name , setName] = useState("...")
  const [username , setUsername] = useState("...")

  useEffect(() => {
    AsyncStorage.getItem("avatar").then(v => setAvatar(v!))
    AsyncStorage.getItem("name").then(v => setName(v!))
    AsyncStorage.getItem("username").then(v => setUsername(v!))
  })

  


  return (
    <View style={{
      ...styles.container,
      backgroundColor : "white",
    }} >

        <View style={{flex : 1, justifyContent : "center" , flexDirection : "row" , paddingVertical : 20}}>
          <View>
            <Image source={{uri : avatar}} style={{
              height : Math.round(Dimensions.get("window").width * 0.6) , 
              width : Math.round(Dimensions.get("window").width * 0.6), 
              borderRadius : Math.round(Dimensions.get("window").width * 0.6)/2}}/>
              
              <Text style={{textAlign : "center" , fontSize : 30}}>{name}</Text>
              <Text style={{textAlign : "center" , color: "gray" , fontSize : 22}}>{"@" + username}</Text>

          </View>
        </View>
        <ScrollView>
          <TouchableOpacity>
            <Text>First Item</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>First Item</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>First Item</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>First Item</Text>
          </TouchableOpacity>

        </ScrollView>
    </View>
  );
}

