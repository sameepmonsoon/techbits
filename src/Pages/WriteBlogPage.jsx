import React, { useEffect, useRef, useState } from "react";
import BlogLayout from "../Layout/BlogLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoAdd } from "react-icons/io5";
import { blogCategories, randomColors } from "../Details";
import { RxCross2 } from "react-icons/rx";
import { BsImage, BsUpload } from "react-icons/bs";
import { BiText } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import Button from "../Components/Button/Button";
import { HttpCalls } from "../utils/HttpCalls";
import { useDispatch } from "react-redux";
import { fetchAllBlogs } from "../Store/blogPostSlice";
import LoadingOverlayComponent from "../Components/LoadingOverlayComponent";
const WriteBlogPage = () => {
  const [diableSubmission, setDisableSubmission] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [textareaValue, setTextareaValue] = useState("");
  const [showAddCategories, setShowAddCategories] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryListItem, setCategoryListItem] = useState([
    { id: "", item: "" },
  ]);
  const handleIconClick = () => {
    setShowAddCategories(!showAddCategories);
    setShowDropdown(false);
  };

  // use dispatch
  const dispatch = useDispatch();
  const handleAddCategoriesClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleCategoryItemClick = (id, item) => {
    const isItemExists = categoryListItem.some(
      (existingItem) => existingItem.id === id
    );
    if (!isItemExists) {
      setCategoryListItem((prevList) => [...prevList, { id, item }]);
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
  const [openBlogCategory, setOpenBlogCategory] = useState(false);
  const handleChange = (event) => {
    setTextareaValue(event.target.value);
  };
  useEffect(() => {
    adjustTextareaHeight();
  }, [textareaValue]);

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
  const textAreaRef2 = useRef(null);
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };

  const handleTextClick = () => {
    setIsFocused(!isFocused);
  };
  useEffect(() => {
    if (isFocused && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isFocused]);

  //this part is  refactored using chatgpt
  const handleSubmit = (event) => {
    event.preventDefault();
    setDisableSubmission(true);

    const fileReader = new FileReader();
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

        // Set the canvas dimensions and draw the compressed image
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Get the compressed image data as a data URL (base64 format)
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7); // Adjust the compression quality as needed (0.8 represents 80% quality)

        const requestData = {
          username: currentUser.username,
          userId: currentUser._id,
          categoryList: categoryListItem,
          titleContent: textareaValue,
          selectedPhoto: compressedDataUrl,
          editorContent: editorContent,
        };

        // Make the API call with the updated request data
        HttpCalls.post("/blogPost", requestData)
          .then((response) => {
            console.log(response.data);
            dispatch(fetchAllBlogs());
            setDisableSubmission(false);
            // setSelectedPhoto(null);
            // setTextareaValue('');
            // setEditorContent('');
            // setCategoryListItem([{ id: '', item: '' }]);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      img.src = fileReader.result; // Set the image source to trigger the onload event
    };

    fileReader.readAsDataURL(selectedPhoto);
  };

  const [result, setResult] = useState([]);

  useEffect(() => {
    HttpCalls.get("/blogPost/getAll")
      .then((response) => {
        console.log(response.data);
        setResult(response.data.getAllBlog);
        // setSelectedPhoto(null);
        // setTextareaValue("");
        // setEditorContent("");
        // setCategoryListItem([{ id: "", item: "" }]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(result);
  return (
    <BlogLayout renderComponents={""}>
      <div className="min-h-screen w-full flex flex-col justify-start items-center scroll-smooth ">
        <LoadingOverlayComponent openCloseOverlay={diableSubmission} />
        <div className="gap-2 w-full sm:w-3/5 flex justify-center items-center flex-col h-auto max-h-full ">
          <div className="relative w-full min-h-[2.5rem] max-h-none flex-wrap flex justify-start items-center border-b-[1px] gap-2 border-b-purple/30 p-2 ">
            <div className="absolute right-0 top-[-2rem]">
              <Button
                icon={<BsUpload size={16} />}
                title={"Publish"}
                border={true}
                color={true}
                background={false}
                linkName={"/writeBlog"}
                onClick={handleSubmit}
              />
            </div>
            {/* category component */}
            <div className="relative sm:absolute left-0 sm:left-[-4.8rem] bg-white z-[10] group flex justify-center h-10 min-w-[2.5rem] items-center rounded-full border-[1px] border-purple/50 p-[1px] cursor-pointer ">
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
                  <ul
                    className={` absolute top-11 left-0 bg-white gap-1 backdrop-blur-md rounded-md border-[1px] capitalize transition-opacity duration-700 border-purple/20 p-2 w-full flex flex-col justify-start items-start `}>
                    {blogCategories.map((item, index) => (
                      <li
                        key={item.id}
                        onClick={() => {
                          handleCategoryItemClick(item.id, item.name);
                        }}
                        className="border-b-[1px] w-full border-b-white hover:bg-gray-200/40 px-1 bg-transparent py-1 text-[14px] text-deep-purple/80 hover:text-deep-purple">
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className=" flex justify-start items-center gap-1 flex-wrap">
              {categoryListItem
                .filter((item) => item.id !== "")
                .map((item, index) => (
                  <div
                    key={item.id}
                    className="w-auto max-w-[10rem] bg-purple/0 text-deep-purple hover:border-purple/60 border-purple/30 text-[14px] p-[2px] gap-1 flex justify-start items-center whitespace-nowrap capitalize rounded-full px-2 border-[1px]">
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

          {/* form */}
          <form className="relative w-full h-auto gap-4 flex flex-col justify-start items-start">
            <div className="relative left-0 sm:absolute sm:left-[-5rem] bg-white z-[5] group flex justify-center h-[3rem] min-w-[3rem] items-center rounded-full border-[1px] border-purple/50 p-[1px] cursor-pointer ">
              <IoAdd
                onClick={() => {
                  setOpenBlogCategory(!openBlogCategory);
                }}
                size={30}
                className={`text-deep-purple/70 group-hover:text-deep-purple cursor-pointer transform transition duration-[400ms] ${
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
            {isFocused && (
              <textarea
                placeholder="Enter your blog title"
                id="myTextarea"
                name=""
                maxLength={300}
                value={textareaValue}
                onChange={handleChange}
                onFocus={() => {
                  setShowAddCategories(false);
                  setOpenBlogCategory(false);
                }}
                ref={textAreaRef}
                className="w-full border-[1px] overflow-hidden border-purple/30 rounded-md focus:outline-0 focus:border-deep-purple p-2 h-auto max-h-none resize-none"></textarea>
            )}
            {selectedPhoto ? (
              <div className="flex justify-start items-start gap-2">
                <img
                  src={URL.createObjectURL(selectedPhoto)}
                  alt="Selected Photo"
                />{" "}
                <span className="text-deep-purple/80 rounded-full border-[1px] p-1 border-deep-purple/60">
                  <RxCross2
                    size={20}
                    className="hover:text-deep-purple cursor-pointer"
                    onClick={() => setSelectedPhoto("")}
                  />
                </span>
              </div>
            ) : (
              <input
                hidden
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
                setOpenBlogCategory(false);
              }}>
              <ReactQuill
                value={editorContent}
                onChange={setEditorContent}
                theme="snow"
                modules={{
                  toolbar: [
                    [{ header: [1, 2,] }],
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
      </div>
    </BlogLayout>
  );
};

export default WriteBlogPage;
