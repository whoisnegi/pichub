// Set in LocalStorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from LocalStorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Authenticate user by passing data to LocalStorage
export const authenticate = (response, next) => {
  setLocalStorage("user", response.data.user);
  next();
};

// Access user info from LocalStorage
export const isAuth = () => {
  if (window !== "undefined") {
    if (localStorage.getItem("access_token")) {
      return JSON.parse(localStorage.getItem("user_info"));
    } else {
      return false;
    }
  }
};

export const signout = (next) => {
  removeLocalStorage("user");
  next();
};

export const updateUser = (response, next) => {
  //   console.log(
  //     "UPDATE USER IN LOCAL STORAGE HELPERS",
  //     response
  //   );
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    auth = response.data;
    localStorage.setItem("user", JSON.stringify(auth));
  }
  next();
};
