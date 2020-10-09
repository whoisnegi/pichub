import { combineReducers } from "redux";
import userReducer from "./authReducer";
import errorReducer from "./errorReducer";
import publicReducer from './publicReducer';
import profileReducer from "./profileReducer";

export default combineReducers({
    userRoot: userReducer,
    profileRoot: profileReducer,
    errorRoot: errorReducer,
    publicRoot: publicReducer
});
