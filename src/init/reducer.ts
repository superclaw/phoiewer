import { combineReducers } from "redux";

import login from "../Pages/Auth/reducer";
import photoList from "../Pages/Main/reducer";
import details from "../Pages/Details/reducer";

export default combineReducers({
  login,
  photoList,
  details,
});
