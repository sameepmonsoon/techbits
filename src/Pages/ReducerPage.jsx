import { useEffect, useReducer, useState } from "react";
import ReactQuill from "react-quill";
import { toastMessageError } from "../Services/Toast Messages/ToastMessages";
import Card from "../Components/Card/Card";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { v4 as uuid } from "uuid";
const ReducerPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [blogValue, setBlogValue] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [enableEdit, setEnableEdit] = useState(false);
  const [buttonType, setButtonType] = useState("Publish");
  const initialState = [
    {
      id: 1,
      title: "",
      photo: "",
      body: "",
    },
  ];

  function reducer(state, action) {
    let updatedState;
    const sameId =
      state.length && state?.some((item) => item?.id === action.payload.id);
    const blogExists = state?.find((item) => item?.id === action.payload);
    const blogExistsForEdit = state?.find(
      (item) => item?.id === action.payload.id
    );
    switch (action.type) {
      case "create":
        if (sameId) {
          updatedState = [...state];
        } else {
          updatedState = [...state];
          updatedState?.push(action.payload);
          setShowForm(false);
          setBlogValue(initialState);
        }
        return updatedState;
      case "read":
        if (blogExists) {
          setShowForm(true);
          setEnableEdit(true);
          setButtonType("Update");
          setBlogValue({
            id: blogExists.id,
            title: blogExists.title,
            body: blogExists.body,
            photo: blogExists.photo,
          });
          updatedState = [...state];
        }
        return updatedState;
      case "update":
        if (blogExistsForEdit) {
          blogExistsForEdit.id = action.payload.id;
          blogExistsForEdit.title = action.payload.title;
          blogExistsForEdit.body = action.payload.body;
          blogExistsForEdit.photo = action.payload.photo;
          updatedState = [...state, blogExists];
          updatedState = state?.filter(
            (item) => item?.id !== "" && item !== undefined
          );
          setShowForm(false);
          setBlogValue({});
          setEnableEdit(false);
          setButtonType("publish");
        }
        return updatedState;
      case "delete":
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (blogExists) {
          updatedState = state?.filter((item) => item.id !== action.payload);
          setShowForm(false);
          setBlogValue({});
          setEnableEdit(false);
          setButtonType("publish");
        }
        return updatedState;
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddBlog = () => {
    setShowForm(true);
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormErrors(formValidation(blogValue));
    if (enableEdit) {
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
      // setFormErrors(formValidation(blogValue));
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
    // console.log(values?.body, "empty ", emptyBody);
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
      if (enableEdit && state.id != "") {
        dispatch({ type: "update", payload: blogValue });
      }
      if (state.length < 0 || !enableEdit)
        dispatch({ type: "create", payload: blogValue });
    }
    if (Object.keys(blogValue).length === 0) {
      toastMessageError("Can't post empty blog.");
    }
  };

  const handleBLogDelete = (blogId) => {
    dispatch({ type: "delete", payload: blogId });
  };
  const handleBLogEdit = (blogId) => {
    dispatch({ type: "read", payload: blogId });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setFormErrors(formValidation(blogValue));
  }, [blogValue]);
  return (
    <div className="w-full h-[200vh] flex flex-col justify-start items-center p-1 gap-10">
      <div className="h-10 flex justify-center items-center w-auto">
        CRUD using useReducer
      </div>
      <div className="h-10 flex justify-center items-center w-auto">
        <button
          className="w-40 h-10 p-2 border-[1px] rounded-md"
          onClick={handleAddBlog}>
          Add BLog
        </button>
      </div>
      {showForm && (
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
            {buttonType}
          </button>
        </form>
      )}

      <p className="w-full h-10 justify-center flex bg-gray-200 items-center">
        Blogs
      </p>
      <div className="flex justify-center items-center gap-10 flex-wrap py-5">
        {state?.length &&
          state
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
                        handleBLogDelete(item?.id);
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
