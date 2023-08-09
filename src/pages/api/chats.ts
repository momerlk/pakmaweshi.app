import * as types from "./types"


export async function GetChats(token : string) : Promise<{status : number , chats : types.ChatData[]}>{
    let resp = await fetch(types.url + "/chat" , {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : token,
        }
    })
    if (resp.status === 200){
        const chats = await resp.json()
        return {
            status : resp.status,
            chats : chats
        }
    }
    return {
        status : resp.status , 
        chats : []
    }
}