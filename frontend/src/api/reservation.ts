import client from ".";

const fetchGetData = async <T>(url: string, ptcd:string, pccd:string):Promise<T> =>{


    const response = await client.get<T>(url, {
        withCredentials:true, 
        params: {
            ptcd: ptcd,
            pccd: pccd
        }
    })

    return response.data
}

export{ fetchGetData }