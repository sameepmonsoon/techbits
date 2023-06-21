export const localBlogInitialState = {
  showForm: false,
  enableEdit: false,
  clearForm: false,
  buttonType: "publish",
  blog: [{}],
  editBlog: {},
};

export function localBlogReducer(state, action) {
  switch (action.type) {
    case "createBlog":
      var newBLog = [...state.blog, action.payload];
      return {
        ...state,
        blog: newBLog,
        showForm: false,
        clearForm: true,
        editBlog: {},
      };

    case "setEditBlog":
      //   var updatedState = state?.blog?.find((item) => item.id === action.payload);
      //   console.log("inside set edit", updatedState);
      return {
        ...state,
        // editBlog: updatedState,
        enableEdit: true,
        showForm: true,
        buttonType: "Update",
      };
    case "updateBlog":
      var findUpdateIndex = state?.blog
        .map((item) => item.id)
        .indexOf(action.payload.id);
      var updatedVal = { ...state };

      updatedVal.blog[findUpdateIndex] = action.payload;
      return {
        ...updatedVal,
        buttonType: "publish",
        enableEdit: false,
        showForm: false,
        clearForm: true,
        editBlog: {},
      };
    case "delete":
      //   window.scrollTo({ top: 0, behavior: "smooth" });
      var blogsAfterDelete = { ...state };
      blogsAfterDelete.blog = blogsAfterDelete?.blog?.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...blogsAfterDelete,
        editBlog: {},
        buttonType: "publish",
        clearForm: true,
        showForm: false,
      };
    case "toggleForm":
      return {
        ...state,
        showForm: !state.showForm,
        buttonType: "publish",
        enableEdit: false,
      };

    default:
      throw new Error();
  }
}
