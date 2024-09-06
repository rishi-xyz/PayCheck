import React from "react";
import DropdownChildern from "../components/Dropdownchildren";
import {useNavigate} from "react-router-dom";
import {useSetReciolState} from "recoil";
import {tokenAtom, userAtom} from "../store/atoms";

const Dropdown=()=>{
	const Navigate = useNavigate();
	const setToken = useSetReciolState(tokenAtom);
	const setUser = useSetReciolState(userAtom);

	function DashboardbNavigator(){
		Navigate("/dashboard");
	};

	function HandleSignout(){
		setToken(null);
		setUser({firstname:"",lastname:""});
		localStorage.removeItem("token");
		Navigate("/");
	};
	return (
		<div className="absolute right-0 top-[110%] bg-slate-100 rounded border border-slate-300">
			<DropdownChildern label={"Dashboard"} onClick={DashboardbNavigator} />
			<DropdownChildern label={"Signout"} onClick={HandleSignout} />
		</div>
	);
};

export default Dropdown;