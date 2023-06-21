import { useEffect, useReducer, useState } from "react";
import ReactQuill from "react-quill";
import { toastMessageError } from "../Services/Toast Messages/ToastMessages";
import Card from "../Components/Card/Card";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { v4 as uuid } from "uuid";
import {
  localBlogInitialState,
  localBlogReducer,
} from "../Hooks/useReducerCustom";
const ReducerPage = () => {
  const [blogValue, setBlogValue] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [state, dispatch] = useReducer(localBlogReducer, localBlogInitialState);
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormErrors(formValidation(blogValue));
    if (state.enableEdit) {
      setBlogValue({ ...blogValue, [name]: value });
    } else {
      if (name === "title") {
        setBlogValue({ ...blogValue, [name]: value, id: uuid() });
      } else {
        setBlogValue({ ...blogValue, [name]: value });
      }
    }
  };
  const handleImageChange = (event) => {
    var files = event?.target?.files[0];
    var reader = new FileReader();
    const name = event.target.name;
    reader.onloadend = () => {
      setBlogValue({ ...blogValue, [name]: reader.result });
      formErrors.photo = "";
    };
    reader.onerror = () => {
      setFormErrors(formValidation(blogValue));
    };
    reader.readAsDataURL(files);
  };
  const formValidation = (values) => {
    let errors = {};
    const emptyTitle = values?.title?.trim()?.length;
    const emptyBody = values?.body?.replace(/<(.|\n)*?>/g, "").trim()?.length;
    if (emptyTitle === 0) {
      errors.title = "title can't be empty ";
    } else {
      let titleRegEx = /^[a-zA-Z]/;
      if (!titleRegEx.test(values.title)) {
        errors.title = "title must not contain numbers.";
      }
    }

    if (!values?.photo) {
      errors.photo = "Please choose photo ";
    }

    if (values?.body == undefined || emptyBody === 0) {
      errors.body = "BLog body can't be empty ";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length !== 0) {
      toastMessageError(
        formErrors?.photo
          ? formErrors?.photo
          : formErrors?.title
          ? formErrors.title
          : formErrors.body
          ? formErrors.body
          : "Internal Error"
      );
    }
    if (
      Object.keys(blogValue).length !== 0 &&
      !Array.isArray(blogValue) &&
      Object.keys(formErrors).length === 0
    ) {
      if (state?.enableEdit && state.blog.length != 0) {
        dispatch({ type: "updateBlog", payload: blogValue });
      }
      if (state?.blog?.length < 0 || !state?.enableEdit)
        dispatch({ type: "createBlog", payload: blogValue });
    }
    if (Object.keys(blogValue).length === 0) {
      toastMessageError("Can't post empty blog.");
    }
  };

  const handleBLogEdit = (blogId) => {
    var editBlog = state.blog.find((item) => item.id === blogId);
    setBlogValue(editBlog);
    dispatch({ type: "setEditBlog", payload: blogId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setFormErrors(formValidation(blogValue));
  }, [blogValue, state]);

  // useEffect(() => {
  //   setBlogValue({});
  // }, [state.clearForm]);

  return (
    <div className="w-full h-[200vh] flex flex-col justify-start items-center p-1 gap-10">
      <div className="h-10 flex justify-center items-center w-auto">
        CRUD using useReducer
      </div>
      <div className="h-10 flex justify-center items-center w-auto">
        <button
          className="w-40 h-10 p-2 border-[1px] rounded-md"
          onClick={() => {
            setBlogValue({});
            dispatch({ type: "toggleForm" });
          }}>
          Add BLog
        </button>
      </div>
      {state.showForm && (
        <form
          className="w-full md:w-[50%] p-2 h-auto  flex flex-col justify-start items-center gap-5 border-[1px] rounded-md"
          onSubmit={handleSubmit}>
          <textarea
            value={blogValue?.title}
            type="text"
            id="title"
            name="title"
            placeholder="Blog Title"
            className="border-[1px] p-1 w-full md:w-[50%]"
            onChange={handleChange}
          />
          <label
            htmlFor="image"
            className="h-auto w-full flex flex-col justify-center items-center md:items-start md:flex-row gap-2 sm:gap-0">
            {blogValue.photo && (
              <img
                src={blogValue?.photo && blogValue?.photo}
                alt="No image chosen"
                className="h-40 w-40 rounded-md border-[1px] order-2 object-cover"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="photo"
              id="image"
              placeholder="Choose Image"
              className="w-full md:w-[30%] order-2 sm:order-2"
            />
          </label>
          <div className="w-full md:w-[50%] h-auto">
            <ReactQuill
              value={blogValue?.body}
              onChange={(e) =>
                handleChange({ target: { name: "body", value: e } })
              }
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
              placeholder="Blog Body"
            />
          </div>

          <button className="w-40 h-10 border-[1px] rounded-md bg-gray-100 border-gray-300">
            {state.buttonType}
          </button>
        </form>
      )}

      <p className="w-full h-10 justify-center flex bg-gray-200 items-center">
        Blogs
      </p>
      <div className="flex justify-center items-center gap-10 flex-wrap py-5">
        {state?.blog?.length &&
          state?.blog
            ?.filter(
              (item) =>
                item?.title !== "" &&
                Object.keys(item).length > 0 &&
                !Array.isArray(item)
            )
            .map((item, index) => (
              <Card
                key={index}
                cardId={item?.id}
                cardTitle={item?.title}
                cardDescription={item?.body}
                cardUserName={
                  <div className="flex gap-2 justify-start items-center w-full">
                    <span
                      onClick={() => {
                        handleBLogEdit(item?.id);
                      }}
                      className="cursor-pointer flex justify-center items-center gap-2 border-[1px] p-1 rounded-md w-20 hover:text-green-600 hover:border-green-600">
                      Edit <FiEdit size={20} />
                    </span>
                    <span
                      onClick={() => {
                        dispatch({ type: "delete", payload: item?.id });
                      }}
                      className="cursor-pointer flex justify-start items-center gap-1 border-[1px] p-1 rounded-md hover:text-red-600 hover:border-red-600">
                      Delete <AiFillDelete size={20} />
                    </span>
                  </div>
                }
                cardImage={item?.photo}
              />
            ))}
      </div>
    </div>
  );
};

export default ReducerPage;
