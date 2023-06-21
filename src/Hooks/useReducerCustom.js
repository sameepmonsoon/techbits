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
      return {
        ...state,
        enableEdit: true,
        showForm: true,
        buttonType: "Update",
      };
    case "updateBlog":
      console.log(action.payload);
      var blog = state?.blog?.map((item) => {
        if (item.id == action.payload.id) return action.payload;
        else return item;
      });
      return {
        ...state,
        blog,
        buttonType: "publish",
        enableEdit: false,
        showForm: false,
        clearForm: true,
        editBlog: {},
      };
    case "delete":
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
