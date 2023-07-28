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
import { StackTypes } from "../../routes";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { SliderBox } from "react-native-image-slider-box";
import { Entypo } from '@expo/vector-icons'; 
import {HStack , VStack} from "../components/util"


import Chat from "../components/chat"
import Dash from "../components/dashboard"
import Settings from "../components/settings"

const Tab = createBottomTabNavigator()

const styles = SignInStyles;

// the quick brown fox jumps over the lazy dog the quick brown fox jumps over th elazy 

interface PostData {
  name : string,
  price : string,
  location : string,
  contact : string,
  images : string[],
  avatar : string,
  username : string
}

const data : PostData[] = [{
  name : "Astro Caught Lackin",
  price : "324",
  location : "Lahore , Punjab , Pakistan",
  contact : "+92 3158972405",
  images : [
    "https://images.immediate.co.uk/production/volatile/sites/23/2023/01/Giant-panda-c2c51b8.jpg?quality=90&resize=980,654",
    "https://miro.medium.com/v2/resize:fit:1200/1*6d5dw6dPhy4vBp2vRW6uzw.png",
    "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/01/26/795b5720-0a91-45cd-8f0c-ccfe494b1836_9d1e5b38.jpg?itok=P8vmWmJh&v=1643159618",
  ],
  avatar : "https://wallpapercave.com/wp/wp5609975.jpg",
  username : "momer",
} , 
{
  name : "Astro Caught Lackin twice",
  price : "69",
  location : "Lahore , Punjab , Pakistan",
  contact : "+92 3158972405",
  images : [
    "https://images.immediate.co.uk/production/volatile/sites/23/2023/01/Giant-panda-c2c51b8.jpg?quality=90&resize=980,654",
    "https://miro.medium.com/v2/resize:fit:1200/1*6d5dw6dPhy4vBp2vRW6uzw.png",
    "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/01/26/795b5720-0a91-45cd-8f0c-ccfe494b1836_9d1e5b38.jpg?itok=P8vmWmJh&v=1643159618",
  ],
  avatar : "https://wallpapercave.com/wp/wp5609975.jpg",
  username : "momer",
}]

export function Post(props : PostData){
  return (
    <View style={{
      flex : 1,
      borderBottomWidth : 1,
      borderTopWidth : 1,
      width : "100%",
      borderColor : "#D3D3D3",
      paddingVertical : 12,
      marginVertical : 20,
    }}>
      <HStack style={{paddingBottom : 12 , paddingLeft : 6}}>
        <Image source={{uri : props.avatar}} style={{height : 30 , width : 30 , borderRadius : 50}}/>
          <Text style={{ fontSize : 18 , paddingHorizontal : 10 , marginTop : 2}}>
            {props.username}
          </Text>
      </HStack>

      <SliderBox images={props.images} sliderBoxHeight={250}/>
      
      <Text style={{fontWeight : 'bold' , fontSize : 26 , paddingHorizontal : 6 , paddingTop : 15}}>{props.name}</Text>
      <HStack style={{paddingTop : 12 , paddingBottom : 1}}>
        <Entypo name="location-pin" size={24} color="red" />
          <Text style={{ fontSize : 16 , paddingHorizontal : 2}}>
            {props.location}
          </Text>
      </HStack>
      <Text style={{paddingHorizontal : 6 , fontSize : 17}}>{props.contact}</Text>

      <HStack style={{flex : 1 , paddingTop : 20 , paddingHorizontal : 6}}>
        <HStack style={{paddingHorizontal : 6 , flex : 1}}>
          <Text style={{alignSelf : "flex-end" , fontSize : 22 , fontWeight : "500" , color : "gray"}}>Rs </Text>
          <Text style={{alignSelf : "flex-end" , fontSize : 22 , paddingHorizontal : 2 , fontWeight : "400"}}>{props.price}</Text>
        </HStack>
        <Button title="Contact"/>
      </HStack>
    </View>
  )
}

export function Posts() {
  const navigation = useNavigation<StackTypes>();
  const [s , setS] = React.useState("")

  return (
    <View style={styles.container} >
      <ScrollView style={{height : "100%" , backgroundColor : "white"}}>
        {data.map(v => 
        <Post 
        name={v.name} 
        price={v.price} 
        images={v.images} 
        contact={v.contact} 
        location={v.location}
        avatar={v.avatar}
        username={v.username}
        />
        )}
        <View style={{paddingVertical : 100}}></View>
      </ScrollView>
    </View>
  );
}

const PostButton = ({children , onPress}) => {
    const navigation = useNavigation<StackTypes>();

  return (
    <TouchableOpacity
      style={{
        top : -20,
        justifyContent : 'center',
        alignItems : 'center',
        ...style.shadow
      }} 
      onPress={() => {
        navigation.navigate("Post")
      }}
    >
      <View
        style={{
          width : 70,
          height : 70,
          borderRadius : 35,
        }} 
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}

export default function () {
  const navigation = useNavigation<StackTypes>();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel : false,
        tabBarStyle : {
          position : 'absolute',
          bottom : 25,
          left : 25,
          right : 20,
          backgroundColor : "#f9f9f9",
          borderRadius : 15,
          height : 70,
          ...style.shadow
        },
      }} 
    >
      <Tab.Screen name="home" component={Posts} 
        options={{
          tabBarIcon : ({focused}) => (
            <View>
              <Image source={require("../icons/home.png")} 
                resizeMode="contain" 
                style={{
                  marginTop : "30%",
                  width : 30,
                  height : 30,
                  tintColor : focused ? "#0275d8" : "#748c92"
                }}
              />
            </View>
          ),
        }} 
      />
      <Tab.Screen name="chat" component={Chat}
        options={{
          tabBarIcon : ({focused}) => (
            <View>
              <Image source={require("../icons/chat.png")} 
                resizeMode="contain" 
                style={{
                  marginTop : "30%",
                  width : 25,
                  height : 25,
                  tintColor : focused ? "#0275d8" : "#748c92"
                }}
              />
            </View>
          ),
        }} 
      />
      <Tab.Screen name="post" component={Posts}
        options={{
          tabBarIcon : ({focused}) => (
            <View>
              <Image source={require("../icons/plus.png")} 
                resizeMode="contain" 
                style={{
                  width : 60,
                  height : 60,
                }}
              />
            </View>
          ),
          tabBarButton : (props) => (
            <PostButton {...props}/>
          ),
        }} 
      />
      <Tab.Screen name="dashboard" component={Dash}
        options={{
          tabBarIcon : ({focused}) => (
            <View>
              <Image source={require("../icons/user.png")} 
                resizeMode="contain" 
                style={{
                  marginTop : "30%",
                  width : 30,
                  height : 30,
                  tintColor : focused ? "#0275d8" : "#748c92"
                }}
              />
            </View>
          ),
        }} 
      />
      <Tab.Screen name="Settings" component={Settings}
        options={{
          tabBarIcon : ({focused}) => (
            <View>
              <Image source={require("../icons/settings.png")} 
                resizeMode="contain" 
                style={{
                  marginTop : "30%",
                  width : 30,
                  height : 30,
                  tintColor : focused ? "#0275d8" : "#748c92"
                }}
              />
            </View>
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  shadow : {
    shadowColor : "#7F5DF0",
    shadowOffset : {
      width : 0,
      height : 10,
    },
    shadowOpacity : 0.25,
    shadowRadius : 3.5,
    elevation : 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
