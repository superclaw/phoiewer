import { combineReducers } from "redux";

import login from "pages/Auth/reducer";
import photoList from "pages/Main/reducer";
import details from "pages/Details/reducer";

export default combineReducers({
  login,
  photoList,
  details,
});
