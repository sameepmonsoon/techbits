import React, { useEffect, useState } from "react";
import { HttpCalls } from "../../utils/HttpCalls";
import { fetchAllBlogs } from "../../Store/blogPostSlice";
import { useDispatch } from "react-redux";
const CommentBox = ({ cardId, userId, commentAdded }) => {
  // state for text/comment value
  const [comment, setComment] = useState("");

  //   dispatch function

  const dispatch = useDispatch();
  useEffect(() => {
    adjustTextareaHeight();
  }, [comment]);
  const adjustTextareaHeight = () => {
    if (comment) {
      const textarea = document.getElementById("myTextarea");
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.maxHeight = `100px`;
    }
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    HttpCalls.post(`/blogPost/${cardId}/comment`, { userId, comment })
      .then((res) => {
        dispatch(fetchAllBlogs);
        commentAdded((prev = !prev));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="w-full">
      <form
        className="w-full h-auto flex flex-col justify-start items-end gap-1"
        onSubmit={handleSubmit}>
        <textarea
          placeholder="Leave a comment"
          id="myTextarea"
          name=""
          maxLength={100}
          value={comment}
          onChange={handleChange}
          //   ref={textAreaRef}
          className="w-[20rem] border-[1px] overflow-hidden border-purple/30 rounded-md focus:outline-0 focus:border-deep-purple p-2 h-auto max-h-none resize-none"></textarea>

        <button
          type="submit"
          className="border-[1px] rounded-md p-[4px] px-2 hover:bg-gray-100"
          onClick={(e) => handleSubmit(e)}>
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
