import React, { useEffect, useRef, useState } from "react";
import BlogLayout from "../Layout/BlogLayout";
import { IoAdd } from "react-icons/io5";
import { blogCategories, randomColors } from "../Details";
import { RxCross2 } from "react-icons/rx";
import { BsImage } from "react-icons/bs";
import { BiText } from "react-icons/bi";
const WriteBlogPage = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission with the selected photo and entered text
    console.log("Selected Photo:", selectedPhoto);
    // Reset form fields
    setSelectedPhoto(null);
    setTextareaValue("");
  };

  return (
    <BlogLayout renderComponents={""}>
      <div className="min-h-screen w-full flex flex-col justify-start items-center scroll-smooth ">
        <div className="gap-2 w-full sm:w-3/5 flex justify-center items-center flex-col h-auto max-h-full ">
          <div className="w-full min-h-[2.5rem] max-h-none flex-wrap flex justify-start items-center border-b-[1px] gap-2 border-b-purple/30 p-2 ">
            {/* category component */}
            <div className="relative group flex justify-center h-10 min-w-[2.5rem] items-center rounded-full border-[1px] border-purple/50 p-[1px] cursor-pointer ">
              <IoAdd
                onClick={handleIconClick}
                size={30}
                className={`text-deep-purple/70 group-hover:text-deep-purple cursor-pointer transform transition duration-[400ms] ${
                  showAddCategories && "rotate-45"
                }`}
              />
              <div
                className={`p-1 ${
                  showAddCategories ? "flex" : "hidden"
                }  transition-height duration-[2s] ease-in`}>
                <span
                  onClick={handleAddCategoriesClick}
                  className="rounded-full bg-purple/10 p-1 px-3 flex justify-center items-center text-[14px] text-deep-purple/80 hover:bg-purple/20 hover:text-deep-purple">
                  Add categories
                </span>
                {showDropdown && (
                  <ul
                    className={`z-10 absolute top-11 left-0 bg-purple/5 gap-1 backdrop-blur-sm rounded-md border-[1px] capitalize transition-opacity duration-700 border-purple/10 p-2 w-full flex flex-col justify-start items-start `}>
                    {blogCategories.map((item, index) => (
                      <li
                        key={item.id}
                        onClick={() =>
                          handleCategoryItemClick(item.id, item.name)
                        }
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
          <form className="w-full h-auto gap-4 flex flex-col justify-start items-start">
            <textarea
              id="myTextarea"
              name=""
              value={textareaValue}
              onChange={handleChange}
              ref={textAreaRef2}
              className="w-full border-[1px] overflow-hidden border-purple/30 rounded-md focus:outline-0 focus:border-deep-purple p-2 h-auto max-h-none resize-none"></textarea>

            <div className="relative group flex justify-center h-[3rem] min-w-[3rem] items-center rounded-full border-[1px] border-purple/50 p-[1px] cursor-pointer ">
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
            {isFocused && (
              <textarea
                id="myTextarea"
                name=""
                value={textareaValue}
                onChange={handleChange}
                ref={textAreaRef}
                className="w-full border-[1px] overflow-hidden border-purple/30 rounded-md focus:outline-0 focus:border-deep-purple p-2 h-auto max-h-none resize-none"></textarea>
            )}
          </form>
        </div>
      </div>
    </BlogLayout>
  );
};

export default WriteBlogPage;
