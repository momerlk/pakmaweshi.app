import * as types from "./types"

export async function signIn(data : types.SignInBody) : Promise<{status : number , token : string}> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    let resp = await fetch(types.url + "/signIn", {
        method : "GET",
        headers : myHeaders,
        body : raw,
        redirect : 'follow' 
    })
    if (resp.status === 200) {
        let res = await resp.json()
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