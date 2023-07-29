export const url = "http://localhost:8080"

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
  name : string,
  price : string,
  location : string,
  contact : string,
  images : string[],
  avatar : string,
}