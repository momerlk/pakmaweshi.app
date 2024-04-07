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

import RadioButtonRN from 'radio-buttons-react-native';
const data = [
{
  label: 'a student'
 },
 {
  label: 'a parent'
 },
 {
  label: 'a teacher'
 }
];

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import api from "../api"

const styles = SignInStyles;

export function SignUp() {
  const navigation = useNavigation<StackTypes>();
  const [image, setImage] = useState<string>();
  const [imageUrl , setImageUrl] = useState<string>();
  const [perm , setPerm] = useState(false);

  // form fields
  const [avatar , setAvatar] = useState("")
  const [username , setUsername] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")
  const [number , setNumber] = useState("")
  const [name , setName] = useState("")

  const [student , setStudent] = useState(true);
  const [parent , setParent] = useState(true);
  const [teacher , setTeacher] = useState(true);


  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.header}>
        <Text style={styles.message}>Create an account!</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={{...styles.containerForm , flex : 1}}>
        <ScrollView>        

        <Text style={styles.title}>Full Name</Text>
        <TextInput placeholder="Enter your full name" style={styles.input} value={name} onChangeText={v => setName(v)}/>

        <Text style={styles.title}>Phone number</Text>
        <HStack style={{paddingVertical : 20}}>
        <Text style={{alignSelf : "flex-end" , fontSize : 18}}>+92 </Text>
        <TextInput placeholder="Phone number " style={{ fontSize : 18 , paddingHorizontal : 10}} inputMode="tel" 
        value={number} onChangeText={v => setNumber(v.toString())}/>
        </HStack>

        <Text style={styles.title}>Who are you ?</Text>
          <RadioButtonRN
            initial={1}
            data={data}
            selectedBtn={(e: any) => {
              setStudent(false);
              setParent(false);
              setTeacher(false);
              
              if (e.label === data[0].label) {
                setStudent(true);
              }
              if (e.label === data[1].label) {
                setParent(true);
              }
              if (e.label === data[2].label) {
                setTeacher(true);
              } 
            }}
          />

        <Text style={styles.title}>Email</Text>
        <TextInput placeholder="Enter your email" style={styles.input} 
        value={email} onChangeText={v => setEmail(v)} inputMode="email"/>


        <Text style={styles.title}>Password</Text>
        <TextInput placeholder="Enter your password" inputMode="text" secureTextEntry={true} style={styles.input}  
        onChangeText={v => setPassword(v)}/>
        <TextInput placeholder="Confirm password" secureTextEntry={true} style={styles.input} />


        <TouchableOpacity style={styles.button} onPress={async () => {
          let resp = await api.users.signUp({
            email : email,
            username : username,
            name : name,
            password : password,
            avatar : avatar,
            number : "+92 " + number
          })
          if (resp != 200){
            alert(`signing up failed with status code ${resp}`)
          } else {
            alert(`successfully created account!`)
            setEmail("")
            setImage("")
            setPassword("")
            setName("")
            setUsername("")
            setNumber("")
            navigation.navigate("SignIn")
          }
        }}>
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
