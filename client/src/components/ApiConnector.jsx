import axios from "axios";

export const AxiosInstance = axios.create({});

export const ApiConnector = (method,url,bodyData,headers,params)=>{
    return AxiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData,
        headers: headers?headers:null,
        params:params?params:null,
    });
};