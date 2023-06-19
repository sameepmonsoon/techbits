import { useEffect, useId, useReducer, useState } from "react";
import ReactQuill from "react-quill";
import { toastMessageError } from "../Services/Toast Messages/ToastMessages";
import Card from "../Components/Card/Card";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { v4 as uuid } from "uuid";
const ReducerPage = () => {
  const [localData, setLocalData] = useState(null);

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
      state.length && state?.some((item) => item.id === action.payload.id);
    switch (action.type) {
      case "create":
        if (sameId) {
          console.log("i am same id", sameId);

          updatedState = [...state];
        } else {
          console.log(
            action.payload.id,
            state.some((item) => item.id === action.payload.id)
          );
          updatedState = [...state];
          updatedState?.push(action.payload);
        }
        localStorage.setItem("localBlog", JSON.stringify(updatedState));
        return updatedState;
      case "read":
        return {};
      case "update":
        return {};
      case "delete":
        console.log("to be deleted id", action.payload);
        return {};
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showForm, setShowForm] = useState(false);
  const [blogValue, setBlogValue] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const handleAddBlog = () => {
    setShowForm(true);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    // console.log(value, name);
    if (name === "title")
      setBlogValue({ ...blogValue, [name]: value, id: uuid() });
    else setBlogValue({ ...blogValue, [name]: value });
  };
  const handleImageChange = (event) => {
    var files = event?.target?.files[0];
    var reader = new FileReader();
    const name = event.target.name;
    reader.onloadend = () => {
      setBlogValue({ ...blogValue, [name]: reader.result });
    };

    reader.readAsDataURL(files);
  };
  const formValidation = (values) => {
    let errors = {};
    if (!values.title) {
      errors.title = "title can't be empty ";
    } else {
      let titleRegEx = /^[a-zA-Z]/;
      if (!titleRegEx.test(values.title)) {
        errors.title = "title must not contain numbers.";
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(formValidation(blogValue));
    if (Object.keys(formErrors).length !== 0) {
      toastMessageError(formErrors?.title);
    } else {
      dispatch({ type: "create", payload: blogValue });
    }
  };

  const handleBLogDelete = (blogId) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa dddddd");
    dispatch({ type: "delete", payload: blogId });
  };

  console.log("all state", state);

  useEffect(() => {
    setLocalData(JSON.parse(localStorage.getItem("localBLog")));
  }, [initialState]);
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
          className="w-[50%] p-2 h-auto  flex flex-col justify-start items-center gap-5 border-[1px] rounded-md"
          onSubmit={handleSubmit}>
          <textarea
            type="text"
            id="title"
            name="title"
            placeholder="type"
            className="border-[1px] p-1 w-[50%]"
            onChange={handleChange}
          />
          <div className="h-auto w-full flex flex-col justify-center items-start sm:flex-row">
            <img
              src={blogValue?.photo && blogValue?.photo}
              alt="No image chosen"
              className="h-40 w-40 rounded-md border-[1px] order-2 object-cover"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="photo"
              className="w-[30%]"
            />{" "}
          </div>
          <div className="w-[50%] h-auto">
            <ReactQuill
              // value={editorContent}
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
              placeholder="Start typing..."
            />
          </div>

          <button className="w-40 h-10 border-[1px] rounded-md bg-gray-100 border-gray-300">
            Publish
          </button>
        </form>
      )}
      <div className="flex justify-center items-center gap-10 flex-wrap py-5">
        {state.length &&
          state
            ?.filter((item) => item.title !== "")
            .map((item, index) => (
              <Card
                key={index}
                cardId={item.id}
                cardTitle={item.title}
                cardDescription={item.body}
                cardUserName={
                  <div className="flex gap-2 justify-start items-center w-full">
                    <span className="cursor-pointer flex justify-center items-center gap-2 border-[1px] p-1 rounded-md w-20 hover:text-green-600 hover:border-green-600">
                      Edit <FiEdit size={20} />
                    </span>
                    <span
                      onClick={handleBLogDelete}
                      className="cursor-pointer flex justify-start items-center gap-1 border-[1px] p-1 rounded-md hover:text-red-600 hover:border-red-600">
                      Delete <AiFillDelete size={20} />
                    </span>
                  </div>
                }
                cardImage={item.photo}
              />
            ))}
      </div>
    </div>
  );
};

export default ReducerPage;
