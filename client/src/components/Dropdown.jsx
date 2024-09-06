import React from "react";
import DropdownChildern from "../components/Dropdownchildren";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenAtom, userAtom } from "../store/atoms";

const Dropdown = () => {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenAtom);
  const setUser = useSetRecoilState(userAtom);

  const dashboardNavigator = () => {
    navigate("/dashboard");
  };

  const handleSignout = () => {
    setToken(null);
    setUser({ firstname: "", lastname: "" });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="absolute right-0 top-[110%] bg-slate-100 rounded border border-slate-300">
      <DropdownChildern label={"Dashboard"} onClick={dashboardNavigator} />
      <DropdownChildern label={"Signout"} onClick={handleSignout} />
    </div>
  );
};

export default Dropdown;
