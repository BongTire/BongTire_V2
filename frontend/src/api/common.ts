import client from ".";
import {IParams} from "@/util/type/common.ts";

const fetchGetData = async <T>(url: string, params:IParams):Promise<T> =>{
    const response = await client.get<T>(url, {
        withCredentials:true, 
        params: params
    })

    return response.data
}

const fetchPostData = async <T>(url: string, params:IParams, data:any):Promise<T> =>{
    
    const response = await client.post<T>(url,data, {
        withCredentials:true,
        params: params
    })

    return response.data
}

const fetchGetAdmin = async <T>(url: string, params:IParams):Promise<T> =>{
    const response = await client.get<T>(url, {
        withCredentials:true,
        params: params
    })

    return response.data
}

export{ fetchGetData , fetchPostData, fetchGetAdmin }