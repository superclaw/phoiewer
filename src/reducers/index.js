import {combineReducers} from "redux";

import photoList from "./photoList";
import login from "./login";

export default combineReducers({
  login,
  photoList,
});