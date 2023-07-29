import * as types from "./types"

export function FileidToUrl(id : string) : string {
    return types.url + `/file?id=${id}`
}

export async function UploadFile(token : string , uris : string[]) : Promise<{status : number, id : string}> {
    for(let i = 0;i < uris.length;i++){
        const uri = uris[i];
        const data = new FormData()
        data.append("name" , "Image Upload");
        data.append("file_attachment" , uri)

        let resp = await fetch(types.url + "/upload" , {
            method : "POST",
            body : data,
            headers : {
                "Authorization" : token,
                'Content-Type': 'multipart/form-data; ',
            },
        })
        if (resp.status === 200){
            let fileId = await resp.text()
            return {
                status : resp.status,
                id : fileId
            } 
        }

        return {
            status : resp.status,
            id : ""
        }
    }

    return {
        status : 0,
        id : "",
    }
}