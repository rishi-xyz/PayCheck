import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { Signincall } from "../apis/Signincall";

export const Signin = () =>{
	const Navigate = useNavigate();
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Heading Text={"Signin"}/>
              <form className="space-y-4 md:space-y-4" action="#">
                <div>
                  <SubHeading Text={"Your Email"}/>
                  <InputBox type={"email"} name={"username"} id={"username"} placeholder={"name@example.com"} onChange={e=>{setUsername(e.target.value)}}/>
                </div>
                <div>
                  <SubHeading Text={"Password"} />
                  <InputBox type={"password"} name={"password"} id={"password"} placeholder={"••••••••"} onChange={e=>{setPassword(e.target.value)}}/>
                </div>
                <div>
                  <Button label={"Login"}
                    onClick={async ()=>{
                    const response = await Signincall({Username,Password});
                    localStorage.setItem("token",response.data.token);
                    Navigate("/dashboard");
                  }} 
                  />
                </div>
                <div>
									<p className="text-sm font-light text-gray-500 dark:text-gray-400">
										Don't have an account?
										<a href={Navigate("/signup")} className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">
										Signup
										</a>
									</p>    
                </div>  
              </form>	
          </div>
        </div>
      </div>
    </section>
  );
}