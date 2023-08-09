import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Welcome } from "../pages/Welcome";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import Home from "../pages/Home"
import Post from "../pages/Post"
import { ChatScreen } from "../pages/components/chat";

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
          headerShown: false,
        }}
        
      />

    </Stack.Navigator>
  );
}
