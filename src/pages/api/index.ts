import * as users from "./user"
import * as files from "./files"
import * as posts from "./posts"
import * as types from "./types"
import * as chats from "./chats"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default {
    getToken : async () : Promise<any> => {
        try {
            let token = await AsyncStorage.getItem("token")
            if(token !== null){
                return token
            }
        } catch(e){
            return e
        }
    },
    types : types,
    users : users,
    files : files,
    posts : posts,
    chats : chats,
}