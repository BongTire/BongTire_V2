import client from ".";

const fetchGetData = async <T>(url: string, ptcd:string, pccd:string, page:number):Promise<T> =>{
    const response = await client.get<T>(url, {
        withCredentials:true, 
        params: {
            ptcd: ptcd,
            pccd: pccd
        }
    })

    return response.data
}

const fetchGetTotalData = async <T>(url: string, ptcd:string, pccd:string, page:number):Promise<T> =>{
    const response = await client.get<T>(url, {
        withCredentials:true,
        params: {
            ptcd: ptcd,
            pccd: pccd
        }
    })

    return response.total
}

const fetchPostData = async <T>(url: string, ptcd:string, pccd:string, data:any):Promise<T> =>{
    
    const response = await client.post<T>(url,data, {
        withCredentials:true,
        params:{
            ptcd: ptcd,
            pccd: pccd
        }
    })

    return response.data
}

export{ fetchGetData, fetchGetTotalData , fetchPostData }