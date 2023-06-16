import { useEffect, useState } from "react";
import signUpImage from "../assets/update.svg";
import userImage from "../assets/user.svg";
import Button from "../Components/Button/Button";
import { ImSpinner5 } from "react-icons/im";
import Modal from "../Components/Modal/Modal";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
import PageLoadingSpinner from "../Components/PageLoadingSpinner/PageLoadingSpinner";
import HomeLayout from "../Layout/HomeLayout";
import { HttpCalls } from "../utils/HttpCalls";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchAllBlogs } from "../Store/blogPostSlice";
import { useNavigate } from "react-router-dom";
import { validateUserInputForm } from "../Services/RegExValidation/RegExValidation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const UpdateProfile = () => {
  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });
  const [togglePasswordName, setTogglePasswordName] = useState("Password");
  const [togglePassword, setTogglePassword] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const username = currentUser?.username;
  const email = currentUser?.email;

  // state for delete dialog box
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValue({ ...formValue, [name]: value });
  };

  // submit function
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(validateUserInputForm(formValue));

    try {
      let profilePicture = null;

      if (selectedPhoto) {
        profilePicture = await compressAndConvertToBase64(selectedPhoto);
      }

      const updatedData = {
        userId: currentUser._id,
        username: formValue?.username,
        profilePicture,
        email: formValue?.email,
        password: formValue?.password,
        phone: formValue?.phone,
      };
console.log(updatedData);
      if (
        profilePicture != null &&
        Object.keys(validateUserInputForm(formValue)).length === 0
      ) {
        console.log(updatedData);
        await HttpCalls.put("/auth/updateProfile", updatedData)
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data.result));
            dispatch(fetchAllBlogs());
            setIsLoading(false);
            const toastId = "alert";
            const existingToast = toast.isActive(toastId);
            if (existingToast) {
              toast.update(toastId, {
                render: `${res.data.message}`,
                autoClose: 4000,
              });
            } else {
              toast.success(res.data.message, {
                toastId: toastId,
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          })
          .catch((err) => {
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
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: {
                  width: "300px",
                },
              });
            }
          });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // this part was copied
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

  const handleProfileDelete = () => {
    HttpCalls.deleteData(`/auth/delete/${currentUser._id}`)
      .then(() => {
        localStorage.removeItem("user");
        dispatch(fetchAllBlogs());
        toast.success("Profile Deleted Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Deleting the profile.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // to handle form phone number input
  const handleOnInput = (e) => {
    let maxLength = 10;
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.trim().slice(0, maxLength);
    }
  };

  const handleToggle = () => {
    setTogglePassword((prevViewPassword) => !prevViewPassword);
  };
  // to toggle password
  useEffect(() => {
    setTogglePasswordName(togglePassword ? "text" : "password");
  }, [togglePassword]);

  // useEffect
  useEffect(() => {
    setTimeout(() => {
      if (currentUser == null) {
        navigate("/");
      }
      setShowSignUpPage(true);
    }, 500);
  }, []);

  return (
    <HomeLayout>
      {!showSignUpPage ? (
        <div className="flex justify-center items-center h-screen">
          <PageLoadingSpinner allowBackground={true} />
        </div>
      ) : (
        <div className="font-sans p-2 flex flex-col lg:flex-row justify-evenly items-center h-full w-full ">
          {/* to disable the navigation while loading-- lock the page */}
          <LoadingOverlayComponent openCloseOverlay={isLoading} />
          <Modal
            autoHeight={false}
            // error={error ? true : false}
            // info={success ? true : false}
            // toggleModal={setToggleModal}
            // openCloseModal={(error && toggleModal) || (success && toggleModal)}
            // modalMessage={success ? success : error}
            bottom={true}
          />
          <div className="signup min-h-[40rem] h-auto min-w-[25rem] font-sans p-2 flex flex-col gap-6 order-2 lg:order-1">
            <span className="flex px-2 justify-center text-[38px] sm:text-[48px] font-[600] text-gray-600 min-w-[30rem]">
              Update Your Profile
            </span>

            {/* sign up form */}
            <form
              action=""
              onSubmit={onSubmit}
              className={`p-5 w-full flex flex-col justify-center items-center sm:items-stretch gap-5 font-sans relative`}>
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
                          : userImage
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
              </label>
              <label
                htmlFor="username"
                className="flex flex-col justify-start items-start  sm:w-auto w-3/5">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formValue?.username ? formValue.username : ""}
                  placeholder={username}
                  onChange={handleChange}
                  maxLength={30}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                />
                {message?.username && (
                  <span className="relative w-full h-[4rem] sm:h-[2.8rem] py-[3px]">
                    <span className="absolute w-full h-auto text-red-700 flex justify-start items-center px-1">
                      {message?.username}
                    </span>
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
                  value={formValue?.email ? formValue.email : ""}
                  placeholder={email}
                  onChange={handleChange}
                  maxLength={30}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                />
                {message?.email && (
                  <span className="relative w-full h-[4rem] sm:h-[2rem] py-[3px]">
                    <span className="absolute w-full h-auto text-red-700 flex justify-start items-center px-1">
                      {message?.email}
                    </span>
                  </span>
                )}
              </label>
              <label
                htmlFor="number"
                className="flex flex-col justify-start items-start  sm:w-auto w-3/5">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  onInput={handleOnInput}
                  value={formValue?.phone}
                  placeholder={"Phone number"}
                  onChange={handleChange}
                  maxLength={30}
                  className={`border-[1px] text-[20px] border-gray-300 cursor-pointer hover:border-purple focus:outline-1 text-gray-600 focus:outline-purple/90 h-[3rem] w-full rounded-md px-4 `}
                />
                {message?.phone && (
                  <span className="relative w-full h-[4rem] sm:h-[2.8rem] py-[3px]">
                    <span className="absolute w-full h-auto text-red-700 flex justify-start items-center px-1">
                      {message?.phone}
                    </span>
                  </span>
                )}
              </label>

              <label
                htmlFor="password"
                className="relative group flex flex-col justify-start items-start sm:w-auto w-3/5">
                <span className="absolute right-3 top-3 text-deep-purple">
                  {togglePassword ? (
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
                  type={togglePasswordName}
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
                  {message?.password && (
                    <span
                      className={`absolute  text-red-600 p-2 px-2 text-[14px] max-h-[5rem] overflow-hidden flex justify-start items-center sm:w-full`}>
                      {message?.password}
                    </span>
                  )}
                </span>
              </label>
              <Button
                onClick={onSubmit}
                title={
                  isLoading ? (
                    <div className="flex justify-center w-full gap-3 text-[16px] opacity-80">
                      Updating...{" "}
                      <ImSpinner5 size={25} className="animate-spin" />
                    </div>
                  ) : (
                    "Update Profile"
                  )
                }
                color={false}
                background={true}
                fullWidth={true}
              />
              <div className="flex justify-center items-center text-xl">or</div>
              <div
                onClick={() => {
                  setOpenDeleteModal((prev) => !prev);
                }}
                className="bg-red-800 h-10 min-w-[16rem] rounded-md flex justify-center items-center text-[16px] cursor-pointer text-white">
                Delete Profile
              </div>
              {openDeleteModal && (
                <div className="absolute bg-white border-[1px]  border-red-100 shadow-red-100 shadow-sm gap-2 h-20 text-black w-40 rounded-md text-[16px] flex flex-col justify-center items-center z-30 left-[10rem] bottom-5">
                  <span>Are you sure?</span>

                  <div className="w-full flex gap-4 justify-center">
                    <span
                      onClick={handleProfileDelete}
                      className="cursor-pointer h-auto  hover:text-red-500 px-1 rounded-md flex justify-center items-center">
                      Delete
                    </span>
                    <span
                      onClick={() => {
                        setOpenDeleteModal(false);
                      }}
                      className="cursor-pointer h-auto  hover:text-green-500 px-1 rounded-md flex justify-center items-center">
                      Cancel
                    </span>
                  </div>
                </div>
              )}
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
