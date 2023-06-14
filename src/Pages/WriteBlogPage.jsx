import { useEffect, useRef, useState } from "react";
import BlogLayout from "../Layout/BlogLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoAdd, MdDeleteOutline, RxCross1 } from "react-icons/all";
import { blogCategories } from "../Details";
import { RxCross2 } from "react-icons/all";
import { BsImage, BsUpload } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { IoIosAdd } from "react-icons/all";
import Button from "../Components/Button/Button";
import { HttpCalls } from "../utils/HttpCalls";
import { useDispatch } from "react-redux";
import { fetchAllBlogs } from "../Store/blogPostSlice";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
import { toast } from "react-toastify";
import { BlogContext } from "../Layout/BlogLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import draftImage from "../assets/draft-2.svg";
const WriteBlogPage = () => {
  //  for edit blog
  const { cardId } = useParams();
  const currentBlog = JSON.parse(localStorage.getItem("currentBlogPosts"));

  // const { isHovering } = useContext(BlogContext);
  const [diableSubmission, setDisableSubmission] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [textareaValue, setTextareaValue] = useState("");
  const [showAddCategories, setShowAddCategories] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryListItem, setCategoryListItem] = useState([
    { id: "", item: "" },
  ]);
  const navigate = useNavigate();

  // state for draft modals
  const [draftData, setDraftData] = useState([]);
  const [isSaved, setSetIsSaved] = useState("");
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [selectedDraftPhoto, setSelectedDraftPhoto] = useState("");

  // if current blog is extracted from a draft
  // state to store the draft Id if the draft is to be published from the draft gallery
  const [currentDraftId, setcurrentDraftId] = useState(null);
  const handleIconClick = () => {
    setShowAddCategories(!showAddCategories);
    setShowDropdown(false);
  };

  // function to map the items inside draft and the edit
  function mapDraftDataOrEditData(id, array) {
    setcurrentDraftId(id);
    const toRenderDraft = array.find(({ _id }) => {
      return _id === id;
    });
    if (toRenderDraft) {
      setSelectedDraftPhoto(toRenderDraft.selectedPhoto);
      setTextareaValue(toRenderDraft.titleContent);
      setEditorContent(toRenderDraft.editorContent);
      setCategoryListItem(toRenderDraft.categoryList);
    }
  }
  // use dispatch
  const dispatch = useDispatch();
  const handleAddCategoriesClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleCategoryItemClick = (id, item) => {
    const isItemExists = categoryListItem.some(
      (existingItem) => existingItem.id === id
    );
    if (categoryListItem.length < 6) {
      if (!isItemExists) {
        setCategoryListItem((prevList) => [...prevList, { id, item }]);
      }
    } else {
      const toastId = "category";
      const existingToast = toast.isActive(toastId);
      if (existingToast) {
        toast.update(toastId, {
          render: `You can only add 5 categories`,
          autoClose: 4000,
        });
      } else {
        toast.success(`You can only add 5 categories`, {
          position: "top-center",
          autoClose: 5000,
          toastId,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  const handleRemoveCategoryItem = (id) => {
    setCategoryListItem((prevList) =>
      prevList.filter((item) => item.id !== id)
    );
  };

  //   for the components inside form
  // to handle the text area height
  const [isFocused, setIsFocused] = useState(false);
  const [openBlogCategory, setOpenBlogCategory] = useState(true);
  const handleChange = (event) => {
    setTextareaValue(event.target.value);
  };
  useEffect(() => {
    adjustTextareaHeight();
  }, [textareaValue]);

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    }
  }, []);
  const adjustTextareaHeight = () => {
    if (isFocused) {
      const textarea = document.getElementById("myTextarea");
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // for photo and text area
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const textAreaRef = useRef(null);

  // function for photo change
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);

    setSelectedDraftPhoto("");
  };

  // for draft photo
  const handlePhotoChangeForDraft = (event) => {
    const draftFile = URL.createObjectURL(event.target.files[0]);
    setSelectedDraftPhoto(draftFile);
    setSelectedPhoto(null);
  };

  const handleTextClick = () => {
    setIsFocused(!isFocused);
  };
  useEffect(() => {
    if (isFocused && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isFocused]);

  const handleSubmit = (event, apiEndPoints, message) => {
    event.preventDefault();
    setDisableSubmission(true);
    if (
      (textareaValue != "" && selectedPhoto != null && editorContent != "") ||
      (textareaValue != "" && selectedDraftPhoto != "" && editorContent != "")
    ) {
      // when its normal publishing
      if (selectedPhoto) {
        const fileReader = new FileReader();

        //this part is  refactored using chatgpt
        fileReader.onload = function () {
          const img = new Image();
          img.onload = function () {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 800; // Maximum width of the compressed image
            const MAX_HEIGHT = 800; // Maximum height of the compressed image
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions if needed
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
            //this part is  refactored using chatgpt
            // Set the canvas dimensions and draw the compressed image
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            //this part is  refactored using chatgpt
            const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.3);

            const requestData = {
              username: currentUser.username,
              userId: currentUser._id,
              categoryList: categoryListItem,
              titleContent: textareaValue,
              selectedPhoto: compressedDataUrl,
              editorContent: editorContent,
              blogId: cardId,
              id: currentDraftId,
            };

            HttpCalls.post(apiEndPoints, requestData)
              .then(() => {
                dispatch(fetchAllBlogs());

                const toastId = "success";
                const existingToast = toast.isActive(toastId);
                if (existingToast) {
                  toast.update(toastId, {
                    render: `${message}`,
                    autoClose: 4000,
                  });
                } else {
                  toast.success(`${message}`, {
                    position: "top-center",
                    autoClose: 5000,
                    toastId,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
                setTimeout(() => {
                  setDisableSubmission(false);
                  setSelectedPhoto(null);
                  setSelectedDraftPhoto("");
                  setTextareaValue("");
                  setEditorContent("");
                  setCategoryListItem([{ id: "", item: "" }]);
                }, 1000);
                navigate("/");
              })
              .catch((error) => {
                const toastId = "alert";
                const existingToast = toast.isActive(toastId);
                if (existingToast) {
                  toast.update(toastId, {
                    render: `${error.response.data.error}`,
                    autoClose: 4000,
                  });
                } else {
                  toast.error(`${error.response.data.error}`, {
                    position: "top-center",
                    autoClose: 5000,
                    toastId,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              });
          };

          img.src = fileReader.result;
        };
        if (selectedPhoto != null) fileReader.readAsDataURL(selectedPhoto);
      }

      // to call api when publishing the file after getting it from a draft
      // image is already base64 ---and low quality
      if (selectedDraftPhoto != "") {
        const requestData = {
          username: currentUser.username,
          userId: currentUser._id,
          categoryList: categoryListItem,
          titleContent: textareaValue,
          selectedPhoto: selectedDraftPhoto,
          editorContent: editorContent,
          id: currentDraftId,
          blogId: cardId,
        };
        HttpCalls.post(apiEndPoints, requestData)
          .then((response) => {
            dispatch(fetchAllBlogs());
            if (apiEndPoints.toLowerCase().includes("/createDraft")) {
              navigate("/");
            }
            const toastId = "alert";
            const existingToast = toast.isActive(toastId);
            if (existingToast) {
              toast.update(toastId, {
                render: `${response.data.message}`,
                autoClose: 4000,
              });
            } else {
              toast.success(`${response.data.message}`, {
                position: "top-center",
                autoClose: 5000,
                toastId,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }

            HttpCalls.get(`/blogPost/getDraft/${currentUser._id}`)
              .then((res) => {
                setDraftData(res.data.getAllBlogDraft);
              })
              .catch((err) => {
                console.log(err);
              });
            setTimeout(() => {
              setDisableSubmission(false);
              setSelectedPhoto(null);
              selectedDraftPhoto("");
              setTextareaValue("");
              setEditorContent("");
              setCategoryListItem([{ id: "", item: "" }]);
            }, 1000);
          })
          .catch((error) => {
            console.log(error);

            const toastId = "alert";
            const existingToast = toast.isActive(toastId);
            if (existingToast) {
              toast.update(toastId, {
                render: `${error.response.data.error}`,
                autoClose: 4000,
              });
            } else {
              toast.error(`${error.response.data.error}`, {
                position: "top-center",
                autoClose: 5000,
                toastId,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          });
      }
    }

    if (categoryListItem.length < 2) {
      setDisableSubmission(false);
      const toastId = "alert";
      const existingToast = toast.isActive(toastId);
      if (existingToast) {
        toast.update(toastId, {
          render: `Category list is empty`,
          autoClose: 4000,
        });
      } else {
        toast.error(`${"Category list is empty"}`, {
          position: "top-center",
          autoClose: 5000,
          toastId,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

    if (!selectedPhoto && selectedDraftPhoto == "") {
      setDisableSubmission(false);
      const toastId = "alert";
      const existingToast = toast.isActive(toastId);
      if (existingToast) {
        toast.update(toastId, {
          render: `Draft Photo is empty`,
          autoClose: 4000,
        });
      } else {
        toast.error(`${"Draft Photo is empty"}`, {
          position: "top-center",
          autoClose: 5000,
          toastId,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    // check value for the blog title
    if (textareaValue === "") {
      setDisableSubmission(false);
      const toastId = "alert";
      const existingToast = toast.isActive(toastId);
      if (existingToast) {
        toast.update(toastId, {
          render: `Blog Title can't be empty.`,
          autoClose: 4000,
        });
      } else {
        toast.error(`Blog Title can't be empty.`, {
          position: "top-center",
          autoClose: 5000,
          toastId,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    // check value for the blog photo
    if (!selectedDraftPhoto && selectedPhoto == null) {
      setDisableSubmission(false);
      const toastId = "alert";
      const existingToast = toast.isActive(toastId);
      if (existingToast) {
        toast.update(toastId, {
          render: `Please Choose a cover image for your blog.`,
          autoClose: 4000,
        });
      } else {
        toast.error("Please Choose a cover image for your blog.", {
          position: "top-center",
          autoClose: 5000,
          toastId,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

    // check value for the blog body
    if (editorContent == "") {
      setDisableSubmission(false);
      const toastId = "alert";
      const existingToast = toast.isActive(toastId);
      if (existingToast) {
        toast.update(toastId, {
          render: `Blog body can't be empty.`,
          autoClose: 4000,
        });
      } else {
        toast.error(`${"Blog body can't be empty."}`, {
          position: "top-center",
          autoClose: 5000,
          toastId,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  // const [result, setResult] = useState([]);

  useEffect(() => {
    HttpCalls.get("/blogPost/getAll")
      .then(() => {
        // setResult(response.data.getAllBlog);
      })
      .catch((error) => {
        console.log(error);
      });

    HttpCalls.get(`/blogPost/getDraft/${currentUser._id}`)
      .then((res) => {
        setDraftData(res.data.getAllBlogDraft);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // to edit the blog if cardId is present
  useEffect(() => {
    mapDraftDataOrEditData(cardId, currentBlog);
  }, [cardId]);

  const renderSavedDraft = (draftId) => {
    mapDraftDataOrEditData(draftId, draftData);
  };

  const handleViewDraft = () => {
    setShowDraftModal((prev) => !prev);
  };

  // to delete draft
  const handleDeleteDraft = (blogId) => {
    HttpCalls.deleteData(`/blogPost/deleteBlogDraft/${blogId}`)
      .then(() => {
        HttpCalls.get(`/blogPost/getDraft/${currentUser._id}`)
          .then((res) => {
            setDraftData(res.data.getAllBlogDraft);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BlogLayout renderComponents={""} getIsSaved={isSaved}>
      {showDraftModal && (
        <div
          className="w-full absolute h-[200vh] flex items-start justify-center bg-white/5 backdrop-blur-sm z-20 top-0"
          // onClick={() => {
          //   setShowDraftModal(false);
          // }}
        >
          <div
            className={`transition-h duration-400 top-[5rem] ease-in-out relative bg-white border-[1px] shadow-xl text-gray-600 p-4 lg:w-[38%] w-[90%] sm:w-[40%] left-[-2.4rem]  sm:left-auto z-20 ${
              showDraftModal ? "opacity-100  h-[35rem] " : "opacity-0 h-0 "
            } rounded-lg flex flex-col gap-2`}>
            <p className="w-full text-[18px] border-b-2 p-1 text-black flex justify-between px-2">
              Draft List
              <RxCross1
                size={25}
                className="cursor-pointer hover:text-gray-500"
                onClick={() => {
                  setShowDraftModal(false);
                }}
              />
            </p>
            <img
              src={draftImage}
              alt=""
              className="h-[30%]  w-full p-1 object-conhtain"
            />
            {draftData.length > 0 ? (
              <div className="h-auto w-full overflow-hidden flex flex-col gap-3">
                {draftData.map((item, index) => (
                  <div
                    key={index}
                    className="overflow-hidden  w-full gap-2 h-auto max-h-[5.5rem] text-[16px] md:text-[18px] flex items-start justify-start p-1 hover:bg-gray-100/80 rounded-md cursor-pointer">
                    <div
                      className="w-auto flex-2 flex justify-start items-start  gap-1 hover:underline underline-offset-4"
                      onClick={() => {
                        renderSavedDraft(item._id);
                      }}>
                      <span>{index + 1}.</span> {item.titleContent}
                    </div>
                    <div className="flex-1 relative right-0 flex justify-end items-center">
                      <span className="group h-auto bg-gray-100 border-[1px] border-gray-300 hover:bg-red-100 rounded-md p-1 ">
                        <MdDeleteOutline
                          size={25}
                          className="hover:cursor-pointer group-hover:text-red-600 "
                          onClick={() => handleDeleteDraft(item._id)}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full w-full overflow-hidden flex justify-center items-center">
                You have no draft.
              </div>
            )}
          </div>
        </div>
      )}
      <LoadingOverlayComponent openCloseOverlay={diableSubmission} />
      <BlogContext.Consumer>
        {({ isHovering }) => (
          <div className="gap-2 md:w-[50%]  flex justify-center items-center flex-col h-auto max-h-full ">
            {isHovering && (
              <div className="absolute z-[100] top-[3.3rem] cursor-pointer  border-[1px] border-gray-200 right-[0.5rem] h-auto max-h-40 w-40 bg-white rounded-md p-[2px] text-[14px] text-black/80">
                <Link
                  to="/"
                  className="w-full h-[1.9rem] flex items-center p-1 rounded-md hover:bg-gray-100/60 px-2">
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="w-full h-[1.9rem] flex items-center p-1 rounded-md hover:bg-gray-100/60 px-2">
                  View Profile
                </Link>
                <div
                  className="w-full h-[1.9rem] flex items-center p-1 rounded-md hover:bg-gray-100/60 px-2"
                  onClick={(event) => {
                    if (!diableSubmission) {
                      handleSubmit(
                        event,
                        "/blogPost/createDraft",
                        "Blog Saved as draft."
                      );
                      setSetIsSaved("Saved");
                    }
                  }}>
                  Save as Draft
                </div>
                <div
                  className="w-full h-[1.9rem] flex items-center p-1 rounded-md hover:bg-gray-100/60 px-2"
                  onClick={() => {
                    handleViewDraft();
                  }}>
                  View Drafts
                </div>
              </div>
            )}
            <div className="relative w-full min-h-[2.5rem] max-h-none flex-wrap flex justify-start items-center border-b-[1px] gap-2 border-b-purple/30 p-2 ">
              <div className="absolute right-0 top-[-2.5rem]">
                <Button
                  icon={<BsUpload size={16} />}
                  title={"Publish"}
                  border={true}
                  color={true}
                  background={false}
                  linkName={"/writeBlog"}
                  onClick={(event) =>
                    handleSubmit(
                      event,
                      "/blogPost/create",
                      "Blog published successfully."
                    )
                  }
                />
              </div>

              {/*add category component */}
              <div className="relative  bg-white z-[10] group flex justify-center h-10 min-w-[2.5rem] items-center rounded-full border-[1px] border-purple/50 p-[1px] cursor-pointer ">
                <IoAdd
                  onClick={handleIconClick}
                  size={30}
                  className={`text-deep-purple/70 group-hover:text-deep-purple cursor-pointer transform transition duration-[400ms] ${
                    showAddCategories && "rotate-45"
                  }`}
                />
                <div
                  className={`p-1 z-[30] ${
                    showAddCategories ? "flex" : "hidden"
                  }  transition-height duration-[2s] ease-in`}>
                  <span
                    onClick={handleAddCategoriesClick}
                    className="rounded-full bg-white border-[1px] border-purple/20 p-1 px-[6px] flex justify-center items-center text-[14px] text-deep-purple/80 hover:bg-purple/5 hover:text-deep-purple">
                    Add categories
                    <IoIosAdd size={22} />
                  </span>
                  {showDropdown && (
                    <div
                      className={` absolute top-11 left-0 bg-white gap-1 backdrop-blur-md rounded-md border-[1px] capitalize transition-opacity duration-700 border-purple/20 p-2 w-full flex flex-col justify-start items-start `}>
                      {blogCategories.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            handleCategoryItemClick(item.id, item.name);
                          }}
                          className="border-b-[1px] list-none w-full border-b-white hover:bg-gray-200/40 px-1 bg-transparent py-1 text-[14px] text-deep-purple/80 hover:text-deep-purple">
                          {item.name}
                        </li>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex justify-start items-center gap-1 flex-wrap w-full">
                {categoryListItem
                  .filter((item) => item.id !== "")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="w-auto max-w-[12rem] bg-purple/0 text-deep-purple hover:border-purple/60 border-purple/30 text-[14px] p-[2px] gap-1 flex justify-start items-center whitespace-nowrap capitalize rounded-full px-2 border-[1px]">
                      <span> {item.item}</span>
                      <span className="text-deep-purple/80">
                        <RxCross2
                          size={18}
                          className="hover:text-deep-purple cursor-pointer"
                          onClick={() => handleRemoveCategoryItem(item.id)}
                        />
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* form  body*/}
            <form className="relative w-full h-auto gap-4 flex flex-col justify-start items-start ">
              <div className="relative left-0 bg-white z-[5] group flex justify-center h-[3rem] min-w-[3rem] items-center rounded-full border-[1px] border-purple/50 p-[1px] cursor-pointer ">
                <div
                  onClick={() => {
                    setOpenBlogCategory(!openBlogCategory);
                  }}
                  size={30}
                  className={`text-deep-purple/70 group-hover:text-deep-purple cursor-pointer transform  ${
                    openBlogCategory && "rotate-45"
                  }`}
                />
                <div
                  className={`p-1 gap-1 ${
                    openBlogCategory ? "flex" : "hidden"
                  }  transition-height duration-[2s] ease-in`}>
                  <label
                    htmlFor="photo"
                    onClick={() => {}}
                    className="rounded-full bg-purple/10 p-1 px-3 flex justify-center items-center text-[14px] text-deep-purple/80 hover:bg-purple/20 hover:text-deep-purple">
                    <BsImage size={25} />
                  </label>
                  <span
                    onClick={handleTextClick}
                    className="rounded-full bg-purple/10 p-1 px-3 flex justify-center items-center text-[14px] text-deep-purple/80 hover:bg-purple/20 hover:text-deep-purple">
                    <BiText size={25} />
                  </span>
                </div>
              </div>
              {isFocused ||
                (textareaValue != null && (
                  <textarea
                    placeholder="Enter your blog title"
                    id="myTextarea"
                    name=""
                    maxLength={300}
                    value={textareaValue}
                    onChange={handleChange}
                    onFocus={() => {
                      setShowAddCategories(false);
                    }}
                    ref={textAreaRef}
                    className="w-full border-[1px] overflow-hidden border-purple/30 rounded-md focus:outline-0 focus:border-deep-purple p-2 h-auto max-h-none resize-none"></textarea>
                ))}
              {selectedPhoto || selectedDraftPhoto ? (
                <div className="flex justify-start items-start gap-2">
                  {selectedDraftPhoto ? (
                    <>
                      <img src={selectedDraftPhoto} alt="Selected Photo" />
                      <input
                        hidden
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={handlePhotoChangeForDraft}
                      />
                    </>
                  ) : (
                    <>
                      <input
                        hidden
                        value={selectedDraftPhoto}
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                      <img
                        src={URL.createObjectURL(selectedPhoto)}
                        alt="Selected Photo"
                      />
                    </>
                  )}
                  <span className="relative text-deep-purple/80 rounded-full border-[1px] p-1 border-deep-purple/60 ">
                    <RxCross2
                      size={20}
                      className="hover:text-deep-purple cursor-pointer "
                      onClick={() => {
                        setSelectedPhoto("");
                        setSelectedDraftPhoto("");
                      }}
                    />
                  </span>
                </div>
              ) : (
                <input
                  hidden
                  value={selectedDraftPhoto}
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              )}

              <div
                className="w-full min-h-20 max-h-none"
                onClick={() => {
                  setShowAddCategories(false);
                }}>
                <ReactQuill
                  value={editorContent}
                  onChange={setEditorContent}
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ header: [1, 2] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                    ],
                    clipboard: {
                      matchVisual: false,
                    },
                  }}
                  placeholder="Start typing..."
                />
              </div>
            </form>
          </div>
        )}
      </BlogContext.Consumer>
    </BlogLayout>
  );
};

export default WriteBlogPage;
