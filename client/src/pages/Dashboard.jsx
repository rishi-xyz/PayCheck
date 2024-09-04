import { useEffect, useState } from "react";
import useRecoilValue from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";
import { usefetchbalance } from "../hooks/usefetchbalance";

const Dashboard = ()=>{
    const [balance,setBalance] = useState("");
    const token = useRecoilValue(tokenAtom);
    const user = useRecoilValue(userAtom);
    usefetchbalance(token,setBalance);

    return(
        <div>
            
        </div>
    );
};