import * as types from "./types"

export async function CreatePost(token : string , data : types.Post) : Promise<number>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    let resp = await fetch(types.url + "/post", {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : token,
        },
        body: raw,
        redirect: 'follow'
    })
    return resp.status
}

export async function GetFeed(token : string) : Promise<{status : number , posts : types.Post[]}>{
    let resp = await fetch(types.url + "/feed" , {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : token,
        }
    })
    if (resp.status === 200){
        const posts = await resp.json()
        return {
            status : resp.status,
            posts : posts
        }
    }
    return {
        status : resp.status , 
        posts : []
    }
}

export async function GetDash(token : string) : Promise<{status : number , posts : types.Post[]}> {
    let resp = await fetch(types.url + "/dash" , {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : token,
        }
    })
    if (resp.status === 200){
        const posts = await resp.json()
        return {
            status : resp.status,
            posts : posts
        }
    }
    return {
        status : resp.status , 
        posts : []
    }
}