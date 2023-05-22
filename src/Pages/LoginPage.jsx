import React, { useEffect, useState } from "react";
import Logo from "../Components/Logo/Logo";
import signInImage from "../assets/login.svg";
import Button from "../Components/Button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { signUp } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImSpinner5 } from "react-icons/im";
import { HttpCalls } from "../utils/HttpCalls";
const LoginPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState("password");
  const [authType, setAuthType] = useState("Sign Up");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  // yup validation
  let schema = yup.object().shape({
    password: yup
      .string()
      .min(6, "At least 6 characters required.")
      .required("Password is required"),
    email: yup.string().email().required("Email is required"),
  });

  // formik form validation
  const formik = useFormik({
    initialValues: { password: "", email: "" },
    onSubmit: (values, action) => {
      setLoading(true);
      HttpCalls.post("", values)
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    },
    validationSchema: schema,
  });

  const handleToggle = () => {
    if (viewPassword) {
      setTogglePassword("text");
      setViewPassword(false);
    } else {
      setTogglePassword("password");
      setViewPassword(true);
    }
  };
  return (
    <div className="font-sans p-10 flex flex-col lg:flex-row justify-evenly items-center h-full w-full overflow-x-hidden">
      <div className="signup h-[40rem] min-w-[25rem] font-sans p-2 flex flex-col gap-6 order-2 lg:order-1">
        <div className="h-20 w-full flex justify-center items-center gap-4 ">
          <Logo />
          <span className="w-[6rem] h-[1.6rem] text-[18px] font-[800] text-gray-600 overflow-hidden">
            TechBits
          </span>
        </div>
        <span className="flex px-2 justify-center text-[38px] sm:text-[48px] font-[600] text-gray-600 min-w-[30rem]">
          Sign in to TechBits
        </span>

        {/* sign up form */}
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="p-5 w-full flex flex-col justify-center items-center sm:items-stretch gap-8 font-sans">
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => formik.handleChange(e)}
              placeholder={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Email"
              }
              maxLength={30}
              className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 ${
                formik.touched.email &&
                formik.errors.email &&
                " placeholder-red-600 "
              }`}
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
              onChange={(e) => formik.handleChange(e)}
              placeholder={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Password"
              }
              maxLength={10}
              className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 ${
                formik.touched.password && formik.errors.password
                  ? " placeholder-red-600 outline-1 outline-red-500"
                  : null
              }`}
            />
          </label>
          <Button
            onClick={formik.handleSubmit}
            title={
              isLoading ? (
                <ImSpinner5 size={25} className="animate-spin" />
              ) : (
                "Continue"
              )
            }
            color={false}
            background={true}
            fullWidth={true}
          />
        </form>
        <p className="w-full flex justify-center items-center px-5">
          <span>
            Create a new account?{" "}
            <Link to={"/signup"} className="underline text-deep-purple">
              Sign up
            </Link>
          </span>
        </p>
      </div>
      <img
        src={signInImage}
        alt=""
        className="h-[50%] w-[30rem] lg:h-[30rem] lg:w-[40rem] order-1 lg:order-2"
      />
    </div>
  );
};

export default LoginPage;
