import { combineReducers } from "redux";

import reducer from "../Pages/Main/reducer";
import login from "../Pages/Auth/reducer";

export default combineReducers({
  login,
  photoList: reducer,
});
