import AsyncStorage from "@react-native-async-storage/async-storage";
import * as types from "./types"

export async function signIn(data : types.SignInBody) : Promise<{status : number , token : string}> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    let resp = await fetch(types.url + "/signIn", {
        method : "POST",
        headers : myHeaders,
        body : raw,
        redirect : 'follow' 
    })
    if (resp.status === 200) {
        let res = await resp.json()

        let user_details = res

        AsyncStorage.setItem("avatar" , user_details.avatar);
        AsyncStorage.setItem("name" , user_details.name)
        AsyncStorage.setItem("username" , user_details.username)
        AsyncStorage.setItem("number" , user_details.number)
        AsyncStorage.setItem("email" , user_details.email)

        alert(`signin reponse = ${JSON.stringify(res)}`)
        
        return {
            status : 200,
            token : res.token
        }
    }

    

    return {
        status : resp.status,
        token : ""
    }
}

export async function signUp(data : types.Account) : Promise<number>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);


    let resp = await fetch(types.url + "/signUp", {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    })

    return resp.status
}
