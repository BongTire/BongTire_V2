import client from ".";

const fetchGetData = async <T>(url: string, ptcd:string='', pccd:string='', page:number=1):Promise<T> =>{
    const response = await client.get<T>(url, {
        withCredentials:true, 
        params: {
            ptcd: ptcd,
            pccd: pccd,
            page: page
        }
    })

    return response.data
}

const fetchPostData = async <T>(url: string, ptcd:string='', pccd:string='', page:number = 1, data:any):Promise<T> =>{
    
    const response = await client.post<T>(url,data, {
        withCredentials:true,
        params:{
            ptcd: ptcd,
            pccd: pccd,
            page: page
        }
    })

    return response.data
}

const fetchGetAdmin = async <T>(url: string, date:string=''):Promise<T> =>{
    const response = await client.get<T>(url, {
        withCredentials:true,
        params: {
            date:date
        }
    })

    return response.data
}

export{ fetchGetData , fetchPostData, fetchGetAdmin }