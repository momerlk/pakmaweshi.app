export const url = "http://192.168.18.6:8080"
export const ws_url = "ws://192.168.18.6:8080"

export interface Account {
    username : string,
    email : string,
    name : string ,
    password : string,
    avatar : string,
    number : string
}

export interface SignInBody {
    username_email : string,
    password : string
}

export interface Post {
  id : string,
  user_id : string,
  name : string,
  description : string,
  price : string,
  location : string,
  username : string,
  contact : string,
  images : string[],
  avatar : string,
}

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
