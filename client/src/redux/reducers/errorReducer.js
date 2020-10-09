const initialState = {
  signupErrors: {},
  loginErrors: {},
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SIGNUP_ERRORS":
      return {
        ...state,
        signupErrors: action.payload,
      };
    case "SET_LOGIN_ERRORS":
      return {
        ...state,
        loginErrors: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
