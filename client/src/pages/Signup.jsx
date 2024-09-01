import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () =>{
    return (
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Heading Text={"Signup"}/>
                <form class="space-y-4 md:space-y-4" action="#">
                  <SubHeading Text={"Your Email"}/>
                  <div>
                    <InputBox type={"email"} name={"email"} id={"email"} placeholder={"name@example.com"}/>
                  </div>
                  <div>
                    <SubHeading Text={"Password"} />
                    <InputBox type={"password"} name={"password"} id={"password"} placeholder={"••••••••"}/>
                  </div>
                  <div>
                    <SubHeading Text={"Confirm password"} />
                    <InputBox type={"confirm-password"} name={"confirm-password"} id={"confirm-password"} placeholder={"••••••••"}/>
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
                    <Button type={"submit"}/>
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?
                      <a href="#" class="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Login here
                      </a>
                    </p>
                </form>
            </div>
          </div>
        </div>
      </section>
    );
}