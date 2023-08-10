import React , {useState , useEffect , useCallback} from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { SignInStyles } from "./styles";
import { StackTypes } from "../../routes";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../api"



import { SliderBox } from "react-native-image-slider-box";
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


import {HStack , VStack} from "../components/util"



import Chat from "../components/chat"
import Dash from "../components/dashboard"
import Settings from "../components/settings"
import { SearchBar } from "../components/util";

const Tab = createBottomTabNavigator()

const styles = SignInStyles;

// the quick brown fox jumps over the lazy dog the quick brown fox jumps over th elazy 

interface PostData {
  name : string,
  description : string,
  price : string,
  location : string,
  contact : string,
  images : string[],
  avatar : string,
  username : string
}

const data : PostData[] = [{
  name : "Pandas from Bangladesh",
  description : "These are very beautiful pandas taken from the wild and are very good at taking care from you taken from Bangladesh but available at your service in Lahore , Punjab , Pakistan they look very beautiful and are sold at a very reasonable price",
  price : "20,000",
  location : "Lahore , Punjab , Pakistan",
  contact : "+92 3158972405",
  images : [
    "https://images.immediate.co.uk/production/volatile/sites/23/2023/01/Giant-panda-c2c51b8.jpg?quality=90&resize=980,654",
    "https://miro.medium.com/v2/resize:fit:1200/1*6d5dw6dPhy4vBp2vRW6uzw.png",
    "https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/canvas/2022/01/26/795b5720-0a91-45cd-8f0c-ccfe494b1836_9d1e5b38.jpg?itok=P8vmWmJh&v=1643159618",
  ],
  avatar : "https://wallpapercave.com/wp/wp5609975.jpg",
  username : "africanboy",
} , 
{
  name : "Astro Caught Lackin twice",
  description : "These are very beautiful pandas taken from the wild and are very good at taking care from you taken from Bangladesh but available at your service in Lahore , Punjab , Pakistan they look very beautiful and are sold at a very reasonable price",
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
  const [liked , setLiked] = useState(false)
  const navigation = useNavigation<StackTypes>()


  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => { //To toggle the show text or hide it
      setTextShown(!textShown);
  }

  const onTextLayout = useCallback((e : any) =>{
      setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
      // console.log(e.nativeEvent);
  },[lengthMore]);


  return (
    <View style={{
      flex : 1,
      borderBottomWidth : 0.5,
      borderTopWidth : 0.5,
      width : "100%",
      borderColor : "#D3D3D3",
      paddingVertical : 12,
      marginVertical : 4,
    }}>
      <HStack style={{paddingBottom : 12 , paddingLeft : 6}}>
        <Image source={{uri : props.avatar}} style={{height : 30 , width : 30 , borderRadius : 50}}/>
          <Text style={{ fontSize : 18 , paddingHorizontal : 10 , marginTop : 2}}>
            {props.username}
          </Text>
      </HStack>

      <SliderBox images={props.images} sliderBoxHeight={250} 
      onCurrentImagePressed={() => liked ? setLiked(false) : setLiked(true)}/>
      

      <HStack style={{paddingTop : 15}}>
        <Text style={{fontWeight : 'bold' , fontSize : 26 , paddingHorizontal : 6 , marginRight : 100}}>{props.name}</Text>
        <TouchableOpacity style={{marginTop : 16 , position : "absolute" , right : 10}} 
        onPress={() => liked ? setLiked(false) : setLiked(true)}>
          { liked 
            ? <AntDesign name="heart" size={32} color="red" />
            : <AntDesign name="hearto" size={32} color="black"/>
          }
        </TouchableOpacity>
      </HStack>

      <HStack style={{paddingTop : 12 , paddingBottom : 1}}>
        <Entypo name="location-pin" size={24} color="red" />
          <Text style={{ fontSize : 16 , paddingHorizontal : 2 , color : "gray"}}>
            {props.location}
          </Text>
      </HStack>
      <Text style={{paddingHorizontal : 6 , fontSize : 17 , color : "gray"}}>{props.contact}</Text>

      <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
              style={{ lineHeight: 18 , paddingHorizontal : 12, paddingTop : 14 }}>{props.description}</Text>

              {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={{paddingHorizontal : 12, paddingTop : 9 , color: "gray" }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
              }

      <HStack style={{flex : 1 , paddingTop : 20 , paddingHorizontal : 6}}>
        <HStack style={{paddingHorizontal : 6 , flex : 1}}>
          <Text style={{alignSelf : "flex-end" , fontSize : 19 , fontWeight : "500" , color : "gray"}}>Rs </Text>
          <Text style={{alignSelf : "flex-end" , fontSize : 19 , paddingHorizontal : 2 , fontWeight : "400"}}>{props.price}</Text>
        </HStack>
        <Button onPress={() => {
          navigation.navigate("Message" , {
            chat : {
              name : props.name,
              username : props.username,
              avatar : props.avatar,
              messages : [],
            }
          }) 
        }} title="Contact"/>
      </HStack>
    </View>
  )
}

export function Posts() {
  const navigation = useNavigation<StackTypes>();
  const [s , setS] = React.useState("")
  const [clicked, setClicked] = useState(false);
  const [posts , setPosts] = useState(data) 

  const [render , setRender] = useState(0)

  const [refreshing, setRefreshing] = React.useState(false);



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    AsyncStorage.getItem("token").then(async token => {
        if (token !== null){
          let resp = await api.posts.GetFeed(token)
          if (resp.status !== 200){
            alert(`failed to get feed with status code = ${resp.status}`)
          } else {
            setRefreshing(false)
            setPosts(resp.posts.reverse())
            
          }
        }  
      })
  }, []);



  useEffect(() => {
    if (render === 0){
      setRender(1)
      AsyncStorage.getItem("token").then(async token => {
        if (token !== null){
          let resp = await api.posts.GetFeed(token)
          if (resp.status !== 200){
            alert(`failed to get feed with status code = ${resp.status}`)
          } else {
            setPosts(resp.posts.reverse())
          }
        }  
      })
    }
  } , [render])

  return (
    <View style={styles.container} >


      <SearchBar 
        clicked={clicked}
        setClicked={setClicked}
        placeholder={"Search"}
        />

        
      <ScrollView style={{height : "100%" , backgroundColor : "white"}}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        {posts.map(v => 
          <Post 
            name={v.name} 
            description={v.description}
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

const PostButton = (props : any) => {
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
        {props.children}
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
          headerShown : false,
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
          headerShown : false,
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
