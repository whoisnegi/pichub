const initialState = {
  user: null,
  error: "",
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_SUCCESS":
      return {
        ...state,
        error: "",
        user: action.payload,
        isAuthenticated: true,
      };
    case "SET_LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
      };
    case "UNSET_LOGIN_ERROR":
      return {
        ...state,
        error: "",
      };
    case "SET_LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        error: "",
        isAuthenticated: false,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "SET_FOLLOWING":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...action.payload],
        },
      };
    case "SET_USER_UPDATE":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_AVATAR_UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload,
        },
      };
    case "DELETE_USER_AVATAR":
      return {
        ...state,
        user: {
          ...state.user,
          avatar: [],
        },
      };
    default:
      return state;
  }
};

export default userReducer;
