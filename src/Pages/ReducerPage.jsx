import { useState } from "react";
import ReactQuill from "react-quill";
import { toastMessageError } from "../Services/Toast Messages/ToastMessages";

const ReducerPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [blogValue, setBlogValue] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const handleAddBlog = () => {
    setShowForm(true);
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    // console.log(value, name);

    setBlogValue({ ...blogValue, [name]: value });
  };
  const handleImageChange = (event) => {
    var files = event?.target?.files[0];
    var reader = new FileReader();

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
      let titleRegEx = /^[a-zA-Z]$/;

      if (!titleRegEx.test(values.title)) {
        errors.title = "title must not contain numbers.";
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(formValidation(blogValue));
    setFormErrors(formValidation(e));

    if (Object.keys(formErrors).length != 0) {
      toastMessageError(formErrors.title);
    }
  };
  return (
    <div className="w-full h-[200vh] flex flex-col justify-start items-center p-1">
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
          className="w-full p-2 h-auto  flex flex-col justify-start items-center gap-5"
          onSubmit={handleSubmit}>
          <textarea
            type="text"
            id="title"
            name="title"
            placeholder="type"
            className="border-[1px] p-1 w-[50%]"
            onChange={handleChange}
          />
          <img
            src={blogValue?.photo && blogValue?.photo}
            alt="No image chosen"
            className="h-40 w-40 rounded-md border-[1px]"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="photo"
          />
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
            Submit
          </button>
        </form>
      )}
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, sed.
        Voluptate cumque incidunt nulla aperiam. Mollitia deserunt libero quidem
        enim eaque quo sequi iure culpa quis nostrum! Tenetur, ullam quod.
      </div>
    </div>
  );
};

export default ReducerPage;
