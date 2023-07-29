import React , {useState , useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import * as Animatable from "react-native-animatable";
import { SignInStyles } from "./styles";
import { StackTypes } from "../../routes";
import { useNavigation } from "@react-navigation/native";
import { HStack , VStack } from "../components/util";

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const styles = SignInStyles;

export function SignUp() {
  const navigation = useNavigation<StackTypes>();
  const [image, setImage] = useState<string>();
  const [perm , setPerm] = useState(false);

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
      allowsEditing : true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.header}>
        <Text style={styles.message}>Create an account!</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={{...styles.containerForm , flex : 1}}>
        <ScrollView>

        <Text style={{textAlign : "center" , fontSize : 20, fontWeight : "bold" , paddingVertical : 20}}>Profile Picture</Text>
        {image ? 
        <Image source={{uri : image}} 
        style={{width : 140 , height : 140  , marginLeft : "30%" , marginTop : 20 , borderRadius : 100}}/>:  
        <Text style={{textAlign : "center" , fontSize : 15, paddingBottom : 10}}>Image will appear here</Text>}

        <Button title="Pick an image from camera roll" onPress={pickImage} />



        <Text style={styles.title}>Full Name</Text>
        <TextInput placeholder="Enter your full name" style={styles.input} />

        <Text style={styles.title}>Phone number</Text>
        <HStack style={{paddingVertical : 20 , paddingHorizontal : 12}}>
        <Text style={{alignSelf : "flex-end" , fontSize : 18}}>+92 </Text>
        <TextInput placeholder="Phone number " style={{ fontSize : 18 , paddingHorizontal : 10}} inputMode="numeric"/>
        </HStack>

        <Text style={styles.title}>Username</Text>
        <TextInput placeholder="Enter your user name" style={styles.input} />

        <Text style={styles.title}>Email</Text>
        <TextInput placeholder="Enter your email" style={styles.input} />


        <Text style={styles.title}>Password</Text>
        <TextInput placeholder="Enter your password" secureTextEntry={true} style={styles.input} />
        <TextInput placeholder="Confirm password" secureTextEntry={true} style={styles.input} />


        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonRegister}>
          <Text
            style={styles.registerButtonText}
            onPress={() => navigation.navigate("SignIn")}
          >
            Already have an account ? Sign In
          </Text>
        </TouchableOpacity>

        <View style={{paddingVertical : 100}}></View>

        </ScrollView>
      </Animatable.View>
    </View>
  );
}
