import { useEffect, useState } from "react";
import useRecoilValue from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";
import { usefetchbalance } from "../hooks/usefetchbalance";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";

const Dashboard = ()=>{
    const [balance,setBalance] = useState("");
    const token = useRecoilValue(tokenAtom);
    const user = useRecoilValue(userAtom);
    usefetchbalance(token,setBalance);

    return(
        <div>
            <Appbar user={user.firstname} />
            <Balance balance={balance} />
        </div>
    );
};
export default Dashboard;