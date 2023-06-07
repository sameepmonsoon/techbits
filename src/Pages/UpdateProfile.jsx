import React, { useEffect, useState } from "react";
import signUpImage from "../assets/update.svg";
import userImage from "../assets/user.svg";
import Button from "../Components/Button/Button";
import { useFormik } from "formik";
import { ImSpinner5 } from "react-icons/im";
import Modal from "../Components/Modal/Modal";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
import PageLoadingSpinner from "../Components/PageLoadingSpinner/PageLoadingSpinner";
import HomeLayout from "../Layout/HomeLayout";
import { HttpCalls } from "../utils/HttpCalls";
import { toast, Slide } from "react-toastify";

const UpdateProfile = () => {
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const username = currentUser?.username;
  const image = currentUser?.selectedPhoto;
  const [userName, setUserName] = useState(username);
  useEffect(() => {
    setTimeout(() => {
      setShowSignUpPage(true);
    }, 500);
  }, []);

  const onSubmit = async (values, event) => {
    setIsLoading(true);
    try {
      let profilePicture = null;

      if (selectedPhoto) {
        profilePicture = await compressAndConvertToBase64(selectedPhoto);
      }
      const updatedData = {
        userId: currentUser._id,
        username: userName,
        profilePicture,
      };
      console.log(updatedData);
      if (profilePicture != null) {
        const response = await HttpCalls.put("/auth/updateProfile", updatedData)
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data.result));
            setIsLoading(false);
            setMessage(res.data.message);
            console.log(res.data.message);
            const toastId = "alert";
            const existingToast = toast.isActive(toastId);
            if (existingToast) {
              toast.update(toastId, {
                render: `${res.data.message}`,
                autoClose: 4000,
              });
            } else {
              toast.error(`${res.data.message}`, {
                toastId: toastId,
                className: "toast-center",
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                closeButton: false,
                icon: false,
                style: {
                  background: "green",
                  color: "white",
                  width: "235px",
                },
              });
            }
          })
          .catch((err) => {
            console.log(err.response.data.error);
            setIsLoading(false);
            const toastId = "alert";
            const existingToast = toast.isActive(toastId);
            if (existingToast) {
                toast.update(toastId, {
                  render: `${err.response.data.error}`,
                  autoClose: 4000,
                });
            } else {
              toast.error(`${err.response.data.error}`, {
                toastId: toastId,
                className: "toast-center",
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                closeButton: false,
                icon: false,
                style: {
                  background: "#da6161",
                  color: "white",
                  width: "500px",
                },
              });
            }
          });

        console.log(response);
      } else {
        const toastId = "alert";
        const existingToast = toast.isActive(toastId);

        if (existingToast) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(`${"Please upload your picture."}`, {
            toastId: toastId,
            className: "toast-center",
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            closeButton: false,
            icon: false,
            style: { background: "#da6161", color: "white", width: "225px" },
          });
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  // this part was generated by chatgpt
  const compressAndConvertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = 800; // maximum width or height
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64String = reader.result.split(",")[1];
                resolve(base64String);
              };
              reader.onerror = (error) => {
                reject(error);
              };
              reader.readAsDataURL(blob);
            },
            "image/jpeg",
            0.7 // adjust the compression quality here (0.7 means 70% quality)
          );
        };
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
            // error={error ? true : false}
            // info={success ? true : false}
            toggleModal={setToggleModal}
            // openCloseModal={(error && toggleModal) || (success && toggleModal)}
            // modalMessage={success ? success : error}
            bottom={true}
          />
          <div className="signup h-[40rem] min-w-[25rem] font-sans p-2 flex flex-col gap-6 order-2 lg:order-1">
            <span className="flex px-2 justify-center text-[38px] sm:text-[48px] font-[600] text-gray-600 min-w-[30rem]">
              Update Your Profile
            </span>

            {/* sign up form */}
            <form
              action=""
              onSubmit={onSubmit}
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
                      src={
                        currentUser?.profilePicture
                          ? currentUser?.profilePicture
                          : image
                      }
                      alt=""
                      className="h-40 w-40 object-cover cursor-pointer rounded-full"
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
              </label>{" "}
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
                {userName == "" && (
                  <span className="text-red-600 p-2 px-2 text-[14px] max-h-[2.5rem] overflow-hidden flex justify-start items-center w-full">
                    {formik.errors}
                  </span>
                )}
              </label>
              <Button
                onClick={onSubmit}
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
