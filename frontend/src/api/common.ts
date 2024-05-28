import client from ".";

const fetchGetData = async <T>(url: string, ptcd:string, pccd:string, page:number):Promise<T> =>{
    const response = await client.get<T>(url, {
        withCredentials:true, 
        params: {
            ptcd: ptcd,
            pccd: pccd,
            page: page
        }
    })

    return response
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

    return response
}

const fetchGetAdmin = async <T>(url: string, year:number=0, month:number=0, day:number=0):Promise<T> =>{
    const response = await client.get<T>(url, {
        withCredentials:true,
        params: {
            year: year,
            month: month,
            day:day
        }
    })

    return response
}

export{ fetchGetData, fetchGetTotalData , fetchPostData, fetchGetAdmin }