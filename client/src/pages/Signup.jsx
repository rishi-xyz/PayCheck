import { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export const Signup = () =>{
  const [Firstname,SetFirstname] = useState("");
  const [Username,setUsername] = useState("");
  const [Password,setPassword] = useState("");
  const [Lastname,setLastname] = useState("");
  const Navigate = useNavigate();
  return (
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Heading Text={"Signup"}/>
              <form class="space-y-4 md:space-y-4" action="#">
                <div>
                  <SubHeading Text={"Your Email"}/>
                  <InputBox type={"email"} name={"username"} id={"username"} placeholder={"name@example.com"} onChange={e=>{setUsername(e.target.value)}}/>
                </div>
                <div>
                  <SubHeading Text={"Password"} />
                  <InputBox type={"password"} name={"password"} id={"password"} placeholder={"••••••••"} onChange={e=>{setPassword(e.target.value)}}/>
                </div>
                <div>
                  <SubHeading Text={"First Name"} />
                  <InputBox type={"first-name"} name={"first-name"} id={"first-name"} placeholder={"Firstname"} onChange={e=>{SetFirstname(e.target.value)}} />
                </div>
                <div>
                  <SubHeading Text={"Last Name"} />
                  <InputBox type={"last-name"} name={"last-name"} id={"last-name"} placeholder={"lastname"}  onChange={e=>{setLastname(e.target.value)}} />
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <Checkbox id={"terms"}/>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the 
                      <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                  <Button label={"Create an account"} 
                    onClick={async ()=>{
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                      username:Username,
                      password:Password,
                      firstname:Firstname,
                      lastname:Lastname
                    });
                    localStorage.setItem("token",response.data.token);
                    Navigate("/dashboard");
                  }} 
                  />
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?
                    <a href={Navigate("/signin")} class="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Login
                    </a>
                  </p>
              </form>
          </div>
        </div>
      </div>
    </section>
  );
}