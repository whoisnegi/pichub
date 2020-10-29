const initialState = {
  posts: null,
  user: null,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_PROFILE":
      return {
        ...state,
        posts: payload.posts,
        user: payload.user,
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [payload, ...state.posts],
        postUploading: true,
      };
    case "ADD_USER_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: payload.data,
              }
            : post
        ),
      };
    case "REMOVE_USER_COMMENT":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: payload.data,
              }
            : post
        ),
      };
    case "UPDATE_USER_LIKES":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? {
                ...post,
                likes: payload.likes,
              }
            : post
        ),
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter(
          (post) => post._id !== payload
        ),
      };
    default:
      return state;
  }
};

export default profileReducer;
