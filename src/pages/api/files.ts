import * as types from "./types"
import * as ImageManipulator from 'expo-image-manipulator';


export function FileidToUrl(id : string) : string {
    return types.url + `/file?id=${id}`
}

export async function UploadFile(token : string , uris : string[]) : Promise<{status : number, ids : string[]}> {
    const ids : string[] = []
    for(let i = 0;i < uris.length;i++){
        const uri = uris[i];
        const formData = new FormData()

        const fName = uri.split('/').pop()


        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [],
            { compress: 1, base64: false , format : ImageManipulator.SaveFormat.JPEG}
        );

        const manipfName = manipResult.uri.split('/').pop()


        formData.append('file', {
            uri : manipResult.uri,
            name : manipfName,
            type : "image/jpeg"
        });


        let resp = await fetch(types.url + "/upload" , {
            method : "POST",
            body : formData,
            headers : {
                "Authorization" : token,
                'Content-Type': 'multipart/form-data',
            },
        })
        if (resp.status === 200){
            let fileId = await resp.json()
            ids.push(fileId.id)
        }

    }

    if (ids.length > 0){
        return {
            status : 200,
            ids : ids
        }
    }

    return {
        status : 0,
        ids : [""],
    }
}