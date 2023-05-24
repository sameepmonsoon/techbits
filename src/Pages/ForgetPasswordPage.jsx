import React, { useEffect, useState } from "react";
import Logo from "../Components/Logo/Logo";
import signUpImage from "../assets/forget-password.svg";
import Button from "../Components/Button/Button";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useFormik } from "formik";
import * as yup from "yup";
import { signUp, clearState } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImSpinner5 } from "react-icons/im";
import Modal from "../Components/Modal/Modal";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
import PageLoadingSpinner from "../Components/PageLoadingSpinner/PageLoadingSpinner";
const ForgetPasswordPage = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState("password");
  const [showSignUpPage, setShowSignUpPage] = useState(false);

  // for modal open and close
  const [toggleModal, setToggleModal] = useState(false);
  useEffect(() => {
    dispatch(clearState());
    setTimeout(() => {
      setShowSignUpPage(true);
    }, 500);
  }, []);
  //  redux store dispatch
  const dispatch = useDispatch();
  const { error, isLoading, success } = useSelector((state) => state.auth);
  // yup validation
  let schema = yup.object().shape({
    username: yup
      .string()
      .test(
        "no-special-characters",
        "Username must not contain special characters",
        (value) => /^[a-zA-Z0-9_]+$/.test(value)
      )
      .required("User name is required."),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@!$%*?&]{6,}$/,
        "At least one uppercase letter,number, and  special character required."
      )

      .test(
        "not-same-as-username",
        "Password must not match the username",
        function (value) {
          const { username } = this.parent;
          return value !== username;
        }
      )
      .min(6, "At least 6 characters required.")
      .required("Password is required."),
    email: yup
      .string()
      .email()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i,
        "Invalid email address."
      )
      .required("Email is required."),
  });
  // formik form validation
  const formik = useFormik({
    initialValues: { username: "", password: "", email: "" },
    onSubmit: (values, action) => {
      dispatch(signUp(values));
    },
    validationSchema: schema,
  });
  const handleToggle = () => {
    setViewPassword((prevViewPassword) => !prevViewPassword);
  };
  // to toggle password
  useEffect(() => {
    setTogglePassword(viewPassword ? "text" : "password");
  }, [viewPassword]);
  useEffect(() => {
    dispatch(clearState());
  }, []);
  console.log(success);
  // to show modal on error change
  useEffect(() => {
    if ((error !== "") | (success !== "")) {
      setToggleModal(true);
    }
  }, [error, success]);
  return (
    <>
      {!showSignUpPage ? (
        // Show spinner while loading
        <div className="flex justify-center items-center h-screen">
          <PageLoadingSpinner allowBackground={true} />
        </div>
      ) : (
        <div className="font-sans p-10 flex flex-col lg:flex-row justify-evenly items-center h-full w-full overflow-x-hidden">
          {/* to disable the navigation while loading-- lock the page */}
          <LoadingOverlayComponent openCloseOverlay={isLoading} />
          <Modal
            autoHeight={false}
            error={error ? true : false}
            info={success ? true : false}
            toggleModal={setToggleModal}
            openCloseModal={error  && toggleModal || (success && toggleModal)}
            modalMessage={success ? success : error}
            bottom={true}
          />
          <div className="signup h-[40rem] min-w-[25rem] font-sans p-2 flex flex-col gap-6 order-2 lg:order-1">
            <div className="h-20 w-full flex justify-center items-center gap-4 ">
              <Logo />
              <span className="w-[6rem] h-[1.6rem] text-[18px] font-[800] text-gray-600 overflow-hidden">
                TechBits
              </span>
            </div>
            <span className="flex px-2 justify-center text-[38px] sm:text-[48px] font-[600] text-gray-600 min-w-[30rem]">
              Sign Up to TechBits
            </span>

            {/* sign up form */}
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className={`p-5 w-full flex flex-col justify-center items-center sm:items-stretch gap-5 font-sans`}>
              <label
                htmlFor="email"
                className="flex flex-col justify-start items-start  sm:w-auto w-3/5">
                <input
                  type="text"
                  name="email"
                  id="email"
                  onBlur={formik.handleBlur}
                  placeholder={"Email or User name"}
                  onChange={formik.handleChange}
                  maxLength={30}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                />
                {formik.touched.email && formik.errors.email && (
                  <span
                    className={`text-red-600 p-2 px-2 text-[14px] max-h-[1.5rem] overflow-hidden flex justify-start items-center w-full`}>
                    {formik.errors.email}
                  </span>
                )}
              </label>
              <label
                htmlFor="password"
                className="relative group flex flex-col justify-start items-start sm:w-auto w-3/5">
                {/* <span className="text-[20px] w-full p-2 capitalize text-deep-purple">
              Password
            </span> */}
                <span className="absolute right-3 top-3 text-deep-purple">
                  {viewPassword ? (
                    <AiFillEyeInvisible
                      size={25}
                      className="cursor-pointer hover:text-blue-purple"
                      onClick={handleToggle}
                    />
                  ) : (
                    <AiFillEye
                      size={25}
                      className="cursor-pointer hover:text-blue-purple"
                      onClick={handleToggle}
                    />
                  )}
                </span>
                <input
                  type={togglePassword}
                  name="password"
                  id="password"
                  onBlur={formik.handleBlur}
                  placeholder={"Password"}
                  onChange={formik.handleChange}
                  maxLength={15}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                />{" "}
                {formik.errors.password && formik.touched.password && (
                  <span
                    className={`text-red-600 p-2 px-2 text-[14px] max-h-[3rem] overflow-hidden flex justify-start items-center sm:w-full`}>
                    {formik.errors.password}
                  </span>
                )}
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
              {/* {authType == "Log in" ? (
            <span>
              Create a new account?{" "}
              <Link to={"/signup"} className="underline text-deep-purple">
                Sign up
              </Link>
            </span>
          ) : ( */}
              <span>
                Already have an account?{" "}
                <Link to={"/login"} className="underline text-deep-purple">
                  Log in
                </Link>
              </span>
              {/* )} */}
            </p>
          </div>
          <img
            src={signUpImage}
            alt=""
            className="h-[50%] w-[30rem] lg:h-[30rem] lg:w-[40rem] order-1 lg:order-2"
          />
        </div>
      )}
    </>
  );
};

export default ForgetPasswordPage;
