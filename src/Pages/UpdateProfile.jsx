import React, { useEffect, useState } from "react";
import signUpImage from "../assets/update.svg";
import userImage from "../assets/user.svg";
import Button from "../Components/Button/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { signUp, clearState } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ImSpinner5 } from "react-icons/im";
import Modal from "../Components/Modal/Modal";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
import PageLoadingSpinner from "../Components/PageLoadingSpinner/PageLoadingSpinner";
import HomeLayout from "../Layout/HomeLayout";
import { HttpCalls } from "../utils/HttpCalls";

const UpdateProfile = () => {
  const [showSignUpPage, setShowSignUpPage] = useState(false);

  const [toggleModal, setToggleModal] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const username = currentUser?.username;
  const email = currentUser?.email;
  const image = currentUser?.selectedPhoto;
  const [userName, setUserName] = useState(username);
  useEffect(() => {
    dispatch(clearState());
    setTimeout(() => {
      setShowSignUpPage(true);
    }, 500);
  }, []);

  const dispatch = useDispatch();
  const { error, isLoading, success } = useSelector((state) => state.auth);

  let schema = yup.object().shape({
    username: yup
      .string()
      .test(
        "no-special-characters",
        "Username must not contain special characters",
        (value) => /^[a-zA-Z0-9_]+$/.test(value)
      )
      .required("Username is required."),

    email: yup
      .string()
      .email("Invalid email address.")
      .required("Email is required."),
  });

  const formik = useFormik({
    initialValues: { username, email },
    onSubmit: async (values) => {
      try {
        let profilePicture = null;

        if (selectedPhoto) {
          profilePicture = await convertToBase64(selectedPhoto);
        }

        const updatedData = {
          userId: currentUser._id,
          username: values.username,
          email: values.email,
          profilePicture,
        };

        const response = await HttpCalls.put(
          "/auth/updateProfile",
          updatedData
        );

        // Handle the response from the backend here
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    },
    validationSchema: schema,
  });

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <HomeLayout>
      {!showSignUpPage ? (
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
            openCloseModal={(error && toggleModal) || (success && toggleModal)}
            modalMessage={success ? success : error}
            bottom={true}
          />
          <div className="signup h-[40rem] min-w-[25rem] font-sans p-2 flex flex-col gap-6 order-2 lg:order-1">
            <span className="flex px-2 justify-center text-[38px] sm:text-[48px] font-[600] text-gray-600 min-w-[30rem]">
              Update Your Profile
            </span>

            {/* sign up form */}
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className={`p-5 w-full flex flex-col justify-center items-center sm:items-stretch gap-5 font-sans`}>
              <label
                htmlFor="image"
                className="w-full flex items-center justify-center">
                {selectedPhoto ? (
                  <>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      hidden
                      onChange={handlePhotoChange}
                    />{" "}
                    <img
                      src={URL.createObjectURL(selectedPhoto)}
                      alt=""
                      id="image"
                      className="h-40 w-40 object-cover cursor-pointer rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={image ? image : userImage}
                      alt=""
                      className="h-400 w-40 object-contain cursor-pointer"
                    />
                    <input
                      type="file"
                      name="image"
                      id="image"
                      hidden
                      onChange={handlePhotoChange}
                    />
                  </>
                )}
              </label>
              <label
                htmlFor="username"
                className="flex flex-col justify-start items-start  sm:w-auto w-3/5">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={userName}
                  placeholder={"User name"}
                  onChange={handleUserNameChange}
                  maxLength={30}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                />
                {formik.errors.username && formik.touched.username && (
                  <span className="text-red-600 p-2 px-2 text-[14px] max-h-[2.5rem] overflow-hidden flex justify-start items-center w-full">
                    {formik.errors.username}
                  </span>
                )}
              </label>

              <Button
                onClick={formik.handleSubmit}
                title={
                  isLoading ? (
                    <ImSpinner5 size={25} className="animate-spin" />
                  ) : (
                    "Update Profile"
                  )
                }
                color={false}
                background={true}
                fullWidth={true}
              />
            </form>
          </div>
          <img
            src={signUpImage}
            alt=""
            className="h-[50%] w-[30rem] lg:h-[30rem] lg:w-[40rem] order-1 lg:order-2"
          />
        </div>
      )}
    </HomeLayout>
  );
};

export default UpdateProfile;
