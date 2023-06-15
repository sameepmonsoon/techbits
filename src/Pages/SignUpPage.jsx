import { useEffect, useState } from "react";
import Logo from "../Components/Logo/Logo";
import signUpImage from "../assets/signup-4.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signUp, clearState } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
import PageLoadingSpinner from "../Components/PageLoadingSpinner/PageLoadingSpinner";
import {
  toastMessageError,
  toastMessageSuccess,
} from "../Services/Toast Messages/ToastMessages";
const SignUpPage = () => {
  const dispatch = useDispatch();
  const { error, isLoading, success } = useSelector((state) => state.auth);
  const [viewPassword, setViewPassword] = useState(false);
  const [togglePassword, setTogglePassword] = useState("password");
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const navigate = useNavigate();

  // form states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [formError, setFormError] = useState({});
  // functions

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormValue({ ...formValue, [name]: value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // setIsSubmitting(true);
    setFormError(validate(formValue));
    if (Object.keys(validate(formValue)).length === 0) {
      dispatch(signUp(formValue));
    }
  };

  // validation function
  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "User name is required";
    } else {
      let userRegEx = /^[a-zA-Z0-9]{4,10}$/;
      if (!userRegEx.test(values.username)) {
        errors.username = "Invalid Username";
      }
    }

    if (!values.email) {
      errors.email = "Email is required";
      // setIsSubmitting(false);
    } else {
      let emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,5}$/i;
      if (!emailRegEx.test(values.email)) {
        errors.email = "Email is not valid";
        // setIsSubmitting(false);
      }
    }
    if (!values.phone) {
      errors.phone = "Phone number is required";
      // setIsSubmitting(false);
    } else {
      let phoneRegEx = /[9][6-9]\d{8}/;

      if (!phoneRegEx.test(values.phone)) {
        errors.phone = "Phone number is not valid";
        // setIsSubmitting(false);
      }
    }
    if (!values.password) {
      errors.password = "Password is valid";
      // setIsSubmitting(false);
    } else {
      let passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

      if (!passwordRegEx.test(values.password)) {
        // setIsSubmitting(false);
        
        errors.password =
          "Password must contain atleast 6 characters, one uppercase, one lowercase, one special-character and one number ";
      }
    }

    return errors;
  };

  // to handle form phone number input
  const handleOnInput = (e) => {
    let maxLength = 10;
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.trim().slice(0, maxLength);
    }
  };

  useEffect(() => {
    dispatch(clearState());
    setTimeout(() => {
      setShowSignUpPage(true);
    }, 500);
  }, []);

  const handleToggle = () => {
    setViewPassword((prevViewPassword) => !prevViewPassword);
  };
  // to toggle password
  useEffect(() => {
    setTogglePassword(viewPassword ? "text" : "password");
  }, [viewPassword]);

  // to show modal on error change
  useEffect(() => {
    if (success) {
      toastMessageSuccess(success);
      setIsSubmitting(false);
      navigate("/");
    }
    if (error) {
      toastMessageError(error);
      setIsSubmitting(false);
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
              onSubmit={handleSubmit}
              className={`p-5 w-full flex flex-col justify-center items-center sm:items-stretch gap-5 font-sans`}>
              <label
                htmlFor="username"
                className="flex flex-col justify-start items-start  sm:w-auto w-3/5">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formValue.username}
                  onChange={handleChange}
                  placeholder={"User name"}
                  maxLength={30}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                  required
                />
                {formError?.username && (
                  <span className="text-red-600 p-2 px-2 text-[14px] max-h-[2.5rem] overflow-hidden flex justify-start items-center w-full">
                    {formError?.username}
                  </span>
                )}
              </label>
              <label
                htmlFor="email"
                className="flex flex-col justify-start items-start  sm:w-auto w-3/5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formValue.email}
                  onChange={handleChange}
                  placeholder={"Email"}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                  required
                />
                {formError?.email && (
                  <span
                    className={`text-red-600 p-2 px-2 text-[14px] max-h-[1.5rem] overflow-hidden flex justify-start items-center w-full`}>
                    {formError?.email}
                  </span>
                )}
              </label>
              <label
                htmlFor="phone"
                className="flex flex-col justify-start items-start  sm:w-auto w-3/5">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  onInput={handleOnInput}
                  value={formValue?.phone}
                  onChange={handleChange}
                  placeholder={"Phone Number"}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                  required
                />
                {formError?.phone && (
                  <span
                    className={`text-red-600 p-2 px-2 text-[14px] max-h-[1.5rem] overflow-hidden flex justify-start items-center w-full`}>
                    {formError?.phone}
                  </span>
                )}
              </label>

              <label
                htmlFor="password"
                className="relative group flex flex-col justify-start items-start sm:w-auto w-3/5">
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
                  placeholder={"Password"}
                  maxLength={15}
                  value={formValue?.password}
                  onChange={handleChange}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                  required
                />
                <span className="relative w-full min-h-[4rem] sm:min-h-[3rem] max-h-[5rem]">
                  {formError?.password && (
                    <span
                      className={`absolute  text-red-600 p-2 px-2 text-[14px] max-h-[5rem] overflow-hidden flex justify-start items-center sm:w-full`}>
                      {formError?.password}
                    </span>
                  )}
                </span>
              </label>
              <button
                type="submit"
                className={`w-[60%] sm:w-full h-10 rounded-md ${
                  isSubmitting ? "bg-black/70" : "bg-black"
                } text-white`}>
                {isSubmitting ? "Signing up... " : "Sign Up"}
              </button>
            </form>
            <p className="w-full flex justify-center items-center px-5">
              <span>
                Already have an account?{" "}
                <Link to={"/login"} className="underline text-deep-purple">
                  Log in
                </Link>
              </span>
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

export default SignUpPage;
