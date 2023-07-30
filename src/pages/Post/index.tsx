import React , {useState , useEffect} from "react";
import { SliderBox } from "react-native-image-slider-box";
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
import {
  Entypo 
} from "@expo/vector-icons"

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../api"

import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


const Tab = createBottomTabNavigator()

const styles = SignInStyles;

const VStack = (props : any) => <View style={{flex : 1, flexDirection : "column" , ...props.style}}>{props.children}</View>

const HStack = (props : any) => <View style={{flex : 1, flexDirection : "row" , ...props.style}}>{props.children}</View>


export default function () {
  const navigation = useNavigation<StackTypes>();
  const [perm , setPerm] = useState(false);
  const [image, setImage] = useState(false);
  const [images , setImages] = useState<string[]>([''])
  const [location, setLocation] = useState<Location.LocationObject>();
  const [address, setAdd] = useState<Location.LocationGeocodedAddress>()
  const [errorMsg, setErrorMsg] = useState("");

  const [description , setDescription] = useState("")
  const [name , setName] = useState("")
  const [price , setPrice] = useState("")
  const [number , setNumber] = useState("")
  

  useEffect(() => {
    (async () => {
      
      if (address){
        return
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let add = await Location.reverseGeocodeAsync({
        longitude : location.coords.longitude,
        latitude : location.coords.latitude,
      } , {})
      if(!location){
        return
      }
      if (!add){
        return
      }
      setAdd(add[0])
      setLocation(location);
    })();
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        setPerm(true)
      }
      return true
    }
  }

  (async () => {
    if (!perm){
      await getPermissionAsync()
    }
  })()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection : true,
      selectionLimit : 6,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.canceled) {
      if(result.assets.length === 1){
        setImage(true)
        setImages([result.assets[0].uri])
      } else {
        setImage(true)
        let res : string[] = []
        for(let i = 0;i < result.assets.length;i++){
          res.push(result.assets[i].uri)
        }
        setImages(res)
      }

      

    }
  };

  return (
    <ScrollView style={styles.container} >
      {image ? <SliderBox images={images} sliderBoxHeight={320}/> : 
      <Text style={{textAlign : "center" , fontSize : 20, fontWeight : "bold" , paddingVertical : 20}}>No Images</Text>}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <TextInput style={{...styles.input , fontSize : 16}} placeholder="Product name"
        value={name}
        onChangeText={v => setName(v)}
      ></TextInput>
      
      <TextInput style={{
            margin: 12,
            minHeight : 100,
            maxHeight : 200,
            fontSize : 16,
            borderWidth: 1,
            padding: 10,
        }} 
      multiline={true} 
      numberOfLines={8}
      maxLength={300}
      value={description}
      onChangeText={v => setDescription(v)}
      placeholder="Product Description"></TextInput>
      <Text style={{paddingHorizontal : 12}}>{description.length}/{300}</Text>

      <HStack style={{paddingVertical : 20 , paddingHorizontal : 12}}>
        <Entypo name="location-pin" size={24} color="black" />
          <Text style={{ fontSize : 18 , paddingHorizontal : 10}}>
            {location ? 
            `${address?.city} , ${address?.region} , ${address?.country}`
            : "Loading ..."}
          </Text>
      </HStack> 
      <HStack style={{paddingVertical : 20 , paddingHorizontal : 12}}>
        <Text style={{alignSelf : "flex-end" , fontSize : 18}}>PKR </Text>
        <TextInput placeholder="Price in Rupees" style={{ fontSize : 18 , paddingHorizontal : 10}} inputMode="numeric" 
          onChangeText={v => setPrice(v.toString())} 
        />
      </HStack> 
      <HStack style={{paddingVertical : 20 , paddingHorizontal : 12}}>
        <Text style={{alignSelf : "flex-end" , fontSize : 18}}>+92 </Text>
        <TextInput placeholder="Phone number " style={{ fontSize : 18 , paddingHorizontal : 10}} inputMode="numeric"
          onChangeText={v => setNumber(v.toString())}
        />
      </HStack> 
      <Button title="Post Product" onPress={async () => {


          const token = await AsyncStorage.getItem('token');
          if (token !== null && images.length > 0) {
            // Uploading images to the server

            const toUpload = []
            if (images.length === 1){
              toUpload.push(images[0])
            } else {
              for(let i = 0;i < images.length;i++){
                toUpload.push(images[i])
              }
            }

            let resp = await api.files.UploadFile(token , toUpload)
            if (resp.status === 200){
              const newImages : string[] = []
              setImages([])
              for(let i = 0;i < resp.ids.length;i++){
                const id = resp.ids[i];
                let uri = api.files.FileidToUrl(id);
                newImages.push(uri)

                console.log(`uri = ${uri}`)
              }
              const fmtLocation = `${address?.city} , ${address?.region} , ${address?.country}` 

              let postResp = await api.posts.CreatePost(token , {
                name : name,
                price : price,
                description : description,
                location : fmtLocation,
                contact : number,
                images : newImages,
                avatar : images[0],
                username : "",
                user_id : "",
                id : "",
              })

              if (postResp === 200){
                alert(`successfully posted`)
                navigation.goBack()
              } else {
                alert(`failed to post with status code ${postResp}`)
              }


              setImages(newImages)
            } else {
              alert(`failed to upload file with status code = ${resp.status}`)
            }

        } else {
          alert(`sign in again! token is null`)
        }




      }}/>
      <View style={{paddingVertical : 200}}></View>
    </ScrollView>
  );
}

