import httpRequest from "../../config/axiosConfig";

export const setUserLogin = (userData) => {
  return async (dispatch) => {
    try {
      const option = {
        data: userData,
        url: "user/login",
        method: "POST",
      };
      const res = await httpRequest(option);
      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem(
        "user_info",
        JSON.stringify(res.data.user)
      );
      dispatch({
        type: "SET_LOGIN_SUCCESS",
        payload: res.data.user,
      });
    } catch (e) {
      dispatch({
        type: "SET_LOGIN_ERROR",
        payload: e.response.data.error,
      });
    }
  };
};

export const setUserSignout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_info");
      const option = {
        url: "user/logout",
        method: "GET",
      };
      await httpRequest(option);
      dispatch({ type: "SET_LOGOUT_SUCCESS" });
      localStorage.removeItem("user_info");
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    } catch (e) {
      console.log(e);
    }
  };
};

export const loadUser = () => async (dispatch) => {
  try {
    const option = {
      url: "user/me",
      method: "GET",
    };
    const res = await httpRequest(option);
    dispatch({ type: "SET_USER", payload: res.data.user });
  } catch (e) {
    console.log(e);
  }
};

export const updateUserAction = (userData) => {
  return async (dispatch) => {
    try {
      const option = {
        data: userData,
        url: "user/me",
        method: "PATCH",
      };
      const res = await httpRequest(option);
      localStorage.setItem(
        "user_info",
        JSON.stringify(res.data.user)
      );
      dispatch({
        type: "USER_UPDATE",
        payload: res.data.user,
      });
    } catch (e) {
      console.log(e);
    }
  };
};
