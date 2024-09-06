import React, { useState } from "react" ;
import { AiOutlineCaretDown } from "react-icons/ai";
import Dropdown  from "../components/Dropdown";

const Appbar = ({user}) =>{
	const [open,setOpen] = useState(false);
	return (
		<div className="w-full relative flex justify-between items-center shadow px-4 sm:px-14">
			<div className="text-xl sm:text-2xl font-bold">Payments App</div>
			<div className="flex justify-between items-center relative" 
				onClick={()=>setOpen((prev)=>!prev)}>
				<div>Hello, {user}</div>
				<AiOutlineCaretDown className="text-sm text-slate-300" />
				{open && <Dropdown />} 
			</div>
		</div>
	);
};

export default Appbar;