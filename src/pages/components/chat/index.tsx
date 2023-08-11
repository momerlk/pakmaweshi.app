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

const msgToImsg = (msg : Message) : IMessage => {return {
  _id : Math.random(),
  text : msg.content,
  createdAt : new Date(),
  user : msg.sent ? {
    _id : 1,
    name : "React",
    avatar : "https://neural.love/cdn/ai-photostock/1ed9b768-7341-6682-b3be-47a7bb8aa7aa/0.jpg?Expires=1693526399&Signature=LZRtaKIz8Li-1hNYLclU5eaBBE-1AJm08vGdFv4umku7-q3ILujYZRa-8Gyb38S99QeqMBh~TObpD0~LjbJqx4InCxi05~NHA7i3PRHI7Z57JPs6llkzRCQvgyf-SHgp6I4nJuH66EWavU8EQ8dVkzN6ao7b9LMneYS3Q5S3xLMc7S2kectSgsQ5KZmpeLDE17o7rUvwcn1WwvXh4UBLRk44zYX~ofZupPyfDl1Ny13qDeJmQQNpjkIBkE4YfUfiBYypVxCmYMkEd8ykwQCnHsmotARAq7Wy6qfeTbEAsvhpLxwex1zIDvY4QewZIJE7pip6d8Kc4RFWdSdl0o6YVA__&Key-Pair-Id=K2RFTOXRBNSROX",
  } : {
    _id : 2,
    name : "React",
    avatar : "https://neural.love/cdn/ai-photostock/1ed9b768-7341-6682-b3be-47a7bb8aa7aa/0.jpg?Expires=1693526399&Signature=LZRtaKIz8Li-1hNYLclU5eaBBE-1AJm08vGdFv4umku7-q3ILujYZRa-8Gyb38S99QeqMBh~TObpD0~LjbJqx4InCxi05~NHA7i3PRHI7Z57JPs6llkzRCQvgyf-SHgp6I4nJuH66EWavU8EQ8dVkzN6ao7b9LMneYS3Q5S3xLMc7S2kectSgsQ5KZmpeLDE17o7rUvwcn1WwvXh4UBLRk44zYX~ofZupPyfDl1Ny13qDeJmQQNpjkIBkE4YfUfiBYypVxCmYMkEd8ykwQCnHsmotARAq7Wy6qfeTbEAsvhpLxwex1zIDvY4QewZIJE7pip6d8Kc4RFWdSdl0o6YVA__&Key-Pair-Id=K2RFTOXRBNSROX",
  },
}}

const msgsToImsgs = (msgs : Message[]) : IMessage[] => {
  const imsgs : IMessage[] = []
  msgs.map(v => 
    imsgs.push(msgToImsg(v))
  )
  return imsgs
}

export function ChatScreen({route , navigation} : any){
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [renders , setRenders] = useState(0)
  
  const chat: ChatData = route.params.chat

  let ws : null | WebSocket = null  


  

  useEffect(() => {
    setMessages(msgsToImsgs(chat.messages))
    if (renders === 0 || ws === null){
      api.getToken().then(token => {
        ws = new WebSocket(api.types.ws_url + "/direct" , undefined , {headers : {
          Authorization : token,
        }})

        ws.onopen = (e : any) => console.log(`connected to websocket!`)

        ws.onmessage = (msg : any) => {
          let parsed = JSON.parse(msg.data)
          setMessages((previousMessages : any) => GiftedChat.append(previousMessages, [msgToImsg(parsed)]))
        }
        ws.onerror = (e : any) => alert(`failed to connect to server, restart app`)
      })
      setRenders(1)
    }
  }, [])
   
  const onSend = useCallback((messages : IMessage[]) => {
    messages.forEach(v => {
      if(ws !== null){
        ws.send(JSON.stringify({
          "receiver" : chat.username,
          "content" : v.text,
          "attachment" : "",
        }))
      }
    })
    setMessages((previousMessages : any) => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={{backgroundColor : "white" , width : "100%" , height: "100%" , paddingBottom : 30}}>
     
    <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          avatar : chat.avatar,

        }}
        
      />
      <View style={{borderBottomColor : "lightGray", borderBottomWidth: 0.1}}></View>
      </View>
  )
}

const mock : ChatData[] = [
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
      <TouchableOpacity onPress={() => navigation.navigate("Message" , {
        chat : props,
      })}>
        <HStack style={{paddingBottom : 12 , paddingLeft : 6}}>
        <Image source={{uri : props.avatar}} style={{height : 65 , width : 65 , borderRadius : 50}}/>
          <VStack style={{paddingHorizontal : 10 , paddingTop : 16}}>
            <Text style={{ fontSize : 18}}>
              {props.name}
            </Text>
            <Text style={{color : "gray"}}>{props.messages[0].content}</Text>
          </VStack>
          <Text style={{paddingTop: 16 , paddingRight : 10 , color : "gray"}}>{props.messages[props.messages.length-1].time_sent}</Text>
      </HStack>
      </TouchableOpacity>
    </View>
  )
}


export interface ChatListProps {
  chats : ChatData[]
}
export default function () {
  const [data , setData] = useState(mock)
  const navigation = useNavigation<StackTypes>();
  const [clicked , setClicked] = useState(false)
  const [renders  , setRenders] = useState(0)

  let ws : null | WebSocket = null  

  useEffect(() => {
    if(renders === 0){
    api.getToken().then(token => {


      ws = new WebSocket(api.types.ws_url + "/direct" , undefined , {headers : {
          Authorization : token,
        }})

      ws.onopen = (e : any) => console.log(`connected to websocket!`)

      ws.onmessage = (msg : any) => {
        
        api.chats.GetChats(token).then(res => {
          if (res.status !== 200){
            alert(`failed to load chats , refresh to retry`)
          } else {
            console.log(res.chats)
            for(let i = 0;i < res.chats.length;i++){
              res.chats[i].messages = res.chats[i].messages.reverse()
            }
            setData(res.chats)
          }
        })

      }

      ws.onerror = (e : any) => alert(`failed to connect to server, restart app`)



      api.chats.GetChats(token).then(res => {
        if (res.status !== 200){
          alert(`failed to load chats , refresh to retry`)
        } else {
          console.log(res.chats)
          for(let i = 0;i < res.chats.length;i++){
            res.chats[i].messages = res.chats[i].messages.reverse()
          }
          setData(res.chats)
        }
        
        setRenders(renders+1)
      })


    })
  }
  })

  return (
    <View style={{...styles.container}} >
      <SearchBar clicked={clicked} setClicked={setClicked} placeholder={"Search Messages"}/>
      <ScrollView style={{...styles.container , backgroundColor : "white"}}>
        {data.map(v => <ChatItem {...v}></ChatItem>)}
      </ScrollView>
    </View>
  );
}

