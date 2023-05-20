import React, { useState } from "react";
import Logo from "../Components/Logo/Logo";
import signUp from "../assets/login.svg";
import Button from "../Components/Button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
const SignUpPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState("password");
  const handleToggle = () => {
    if (viewPassword) {
      setTogglePassword("text");
      setViewPassword(false);
    } else {
      setTogglePassword("password");
      setViewPassword(true);
    }
  };

  // formik form validation
  const formik = useFormik({ initialValues: "", onSubmit: () => {} });
  return (
    <div className="font-sans p-10 flex flex-col lg:flex-row justify-evenly items-center h-full w-full overflow-x-hidden">
      <div className="signup h-[40rem] min-w-[25rem] font-sans p-2 flex flex-col gap-5 order-2 lg:order-1">
        <div className="h-20 w-full flex justify-center items-center gap-4 ">
          <Logo />
          <span className="w-[6rem] h-[1.6rem] text-[18px] font-[800] text-gray-600 overflow-hidden">
            TechBits
          </span>
        </div>
        <span className="flex px-2 justify-center text-[38px] sm:text-[48px] font-[600] text-gray-600">
          Sign Up to TechBits
        </span>
        <form
          action=""
          className="p-5 w-full flex flex-col justify-center gap-8 font-sans">
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="User name"
              maxLength={30}
              className="border-[1px] text-[20px] border-gray-200 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              maxLength={30}
              className="border-[1px] text-[20px] border-gray-200 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4"
            />
          </label>
          <label htmlFor="password" className="relative text-gray-700 group">
            {/* <span className="text-[20px] w-full p-2 capitalize text-deep-purple">
              Password
            </span> */}
            <span className="absolute right-3 top-3">
              {viewPassword ? (
                <AiFillEye
                  size={25}
                  className="cursor-pointer hover:text-gray-800"
                  onClick={handleToggle}
                />
              ) : (
                <AiFillEyeInvisible
                  size={25}
                  className="cursor-pointer hover:text-gray-800"
                  onClick={handleToggle}
                />
              )}
            </span>
            <input
              type={togglePassword}
              name="password"
              id="password"
              placeholder="Password"
              maxLength={10}
              className="border-[1px] text-[20px] border-gray-200 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4"
            />
          </label>
          <Button
            title={"Sign Up"}
            color={false}
            background={true}
            fullWidth={true}
          />
        </form>
      </div>
      <img
        src={signUp}
        alt=""
        className="h-[50%] min-w-[40%] lg:h-[60%] lg:w-auto order-1 lg:order-2"
      />
    </div>
  );
};

export default SignUpPage;
