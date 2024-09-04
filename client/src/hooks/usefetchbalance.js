import { useEffect } from "react";
import { getBalance } from "../apis/getBalance";

export const usefetchbalance = (token,setBalance)=>{
    useEffect(()=>{
        const fetchbalance = async ()=>{
            const userbalance = await getBalance(token);
            setBalance(userbalance);
        };
        fetchbalance();
    },[token]);
}