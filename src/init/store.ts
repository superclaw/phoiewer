import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/index";
import thunk from "redux-thunk";
import reducer from "./reducer";

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
