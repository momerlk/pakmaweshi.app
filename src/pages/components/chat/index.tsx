import React , {useState , useEffect , useCallback} from "react";
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

import {GiftedChat, IMessage} from "react-native-gifted-chat"

import {SearchBar , HStack , VStack} from "../util"
import api from "../../api";

const Tab = createBottomTabNavigator()

const styles = SignInStyles;

export interface Message {
  content : string;
  sent : boolean;
  time_sent : string;
}
export interface ChatData {
  name : string;
  username : string;
  avatar : string;
  messages : Message[];
}

export function ChatScreen(){
  const [messages, setMessages] = useState<IMessage[]>([]);
  
   
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
   
  const onSend = useCallback((messages : IMessage[]) => {
    setMessages((previousMessages : any) => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={{backgroundColor : "white" , width : "100%" , height: "100%" , paddingBottom : 30}}>
    <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        
      />
      <View style={{borderBottomColor : "lightGray", borderBottomWidth: 2}}></View>
      </View>
  )
}

const data : ChatData[] = [
  {
    "name" : "Omer Ali Malik",
    "username" : "momer",
    "avatar" : "https://neural.love/cdn/ai-photostock/1ed9b768-7341-6682-b3be-47a7bb8aa7aa/0.jpg?Expires=1693526399&Signature=LZRtaKIz8Li-1hNYLclU5eaBBE-1AJm08vGdFv4umku7-q3ILujYZRa-8Gyb38S99QeqMBh~TObpD0~LjbJqx4InCxi05~NHA7i3PRHI7Z57JPs6llkzRCQvgyf-SHgp6I4nJuH66EWavU8EQ8dVkzN6ao7b9LMneYS3Q5S3xLMc7S2kectSgsQ5KZmpeLDE17o7rUvwcn1WwvXh4UBLRk44zYX~ofZupPyfDl1Ny13qDeJmQQNpjkIBkE4YfUfiBYypVxCmYMkEd8ykwQCnHsmotARAq7Wy6qfeTbEAsvhpLxwex1zIDvY4QewZIJE7pip6d8Kc4RFWdSdl0o6YVA__&Key-Pair-Id=K2RFTOXRBNSROX",
    "messages" : [
      {
        "content" : "test",
        "sent" : false,
        "time_sent" : "11:58 a.m",
      },
      {
        "content" : "test",
        "sent" : false,
        "time_sent" : "11:58 a.m",
      },
      {
        "content" : "hello!",
        "sent" : true,
        "time_sent" : "11:58 a.m",
      },
    ],
  },
  {
    "name" : "Omer Ali Malik",
    "username" : "momer",
    "avatar" : "https://neural.love/cdn/ai-photostock/1ed9b768-7341-6682-b3be-47a7bb8aa7aa/0.jpg?Expires=1693526399&Signature=LZRtaKIz8Li-1hNYLclU5eaBBE-1AJm08vGdFv4umku7-q3ILujYZRa-8Gyb38S99QeqMBh~TObpD0~LjbJqx4InCxi05~NHA7i3PRHI7Z57JPs6llkzRCQvgyf-SHgp6I4nJuH66EWavU8EQ8dVkzN6ao7b9LMneYS3Q5S3xLMc7S2kectSgsQ5KZmpeLDE17o7rUvwcn1WwvXh4UBLRk44zYX~ofZupPyfDl1Ny13qDeJmQQNpjkIBkE4YfUfiBYypVxCmYMkEd8ykwQCnHsmotARAq7Wy6qfeTbEAsvhpLxwex1zIDvY4QewZIJE7pip6d8Kc4RFWdSdl0o6YVA__&Key-Pair-Id=K2RFTOXRBNSROX",
    "messages" : [
      {
        "content" : "test",
        "sent" : false,
        "time_sent" : "11:58 a.m",
      },
      {
        "content" : "test",
        "sent" : false,
        "time_sent" : "11:58 a.m",
      },
      {
        "content" : "hello!",
        "sent" : true,
        "time_sent" : "11:58 a.m",
      },
    ],
  },
]

export interface ChatItemProps {
  name : string;
  avatar : string;
}
export function ChatItem(props : ChatData){
  const navigation = useNavigation<StackTypes>();

  return (
    <View style={{paddingTop : 7}}>
      <TouchableOpacity onPress={() => navigation.navigate("Message")}>
        <HStack style={{paddingBottom : 12 , paddingLeft : 6}}>
        <Image source={{uri : props.avatar}} style={{height : 65 , width : 65 , borderRadius : 50}}/>
          <VStack style={{paddingHorizontal : 10 , paddingTop : 16}}>
            <Text style={{ fontSize : 18}}>
              {props.name}
            </Text>
            <Text style={{color : "gray"}}>{props.messages[props.messages.length-1].content}</Text>
          </VStack>
          <Text style={{paddingTop: 16 , paddingRight : 10 , color : "gray"}}>{props.messages[props.messages.length-1].time}</Text>
      </HStack>
      </TouchableOpacity>
    </View>
  )
}


export interface ChatListProps {
  chats : ChatData[]
}
export default function () {
  let props = data
  const navigation = useNavigation<StackTypes>();
  const [clicked , setClicked] = useState(false)

  useEffect(() => {
    api.getToken().then(token => {
      api.chats.GetChats(token).then(data => {
        props = data.chats
        alert(`loaded chats!`)
      })
    })
  })

  return (
    <View style={{...styles.container}} >
      <SearchBar clicked={clicked} setClicked={setClicked} placeholder={"Search Messages"}/>
      <ScrollView style={{...styles.container , backgroundColor : "white"}}>
        {props.map(v => <ChatItem {...v}></ChatItem>)}
      </ScrollView>
    </View>
  );
}

