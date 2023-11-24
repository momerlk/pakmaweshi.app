import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Button,
} from "react-native"

import { Welcome } from "../pages/Welcome";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import Home from "../pages/Home"
import Post from "../pages/Post"
import { ChatScreen } from "../pages/components/chat";

import {HStack} from "../pages/components/util"

const Stack = createNativeStackNavigator();
type StackNavigation = {
  Welcome: undefined;
  SignIn: undefined;
  Login: undefined;
};
export type StackTypes = NativeStackNavigationProp<StackNavigation>;
export function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ 
          headerShown: false,
          headerBackVisible : false,
          gestureEnabled: false,
        }}
        
      />

      <Stack.Screen
        name="Post"
        component={Post}
        options={{ 
          headerShown: true,
        }}
        
      />

      <Stack.Screen
        name="Message"
        component={ChatScreen}
        options={{ 
          headerShown: true,
           header: ({route , navigation} : any) => (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 60,
              marginTop : 23,
              borderBottomColor : "gray",
              borderBottomWidth : 0.1,
            }}>
              <TouchableOpacity
              style={{ padding: 10 , marginTop : 6}}
              onPress={() => {
                navigation.goBack()
              }}>
              <Text style={{fontSize : 30 , color : '#2E67F8'}}>{"<"}</Text>
            </TouchableOpacity>
            <HStack style={{marginTop : 20, paddingLeft : 6}}>
              
            <Image source={{uri : route.params.chat.avatar}} style={{height : 30 , width : 30 , borderRadius : 50}}/>
              <Text style={{ fontSize : 18 , paddingHorizontal : 10 , marginTop : 2}}>
                {route.params.chat.name === "" ? route.params.chat.username : route.params.chat.name}
              </Text>
          </HStack>
          </View>
        ),
        }}
        
      />

    </Stack.Navigator>
  );
}
