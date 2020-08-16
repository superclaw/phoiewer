import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import Unsplash from "unsplash-js/lib/unsplash";
import Cookies from "js-cookie";

import reducer from "./reducers";
import App from "./modules/App";
import {ACCESS_KEY, SECRET_KEY} from "./constants";
import "./index.css";

export const unsplash = new Unsplash({
  accessKey: ACCESS_KEY,
  secret: SECRET_KEY,
  callbackUrl: "http://superclaw.ddns.net:3000/phoiewer/build/redirect",
  bearerToken: Cookies.get('unsplash_access_token'),
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos",
  "write_likes",
]);

export const errorHandler = code => {
  switch (code) {
    case 400: return 'Код авторизации недействителен';
    case 401: return 'Вы не авторизованы или срок действия авторизации истёк';
    case 403: return 'Превышен лимит запросов на сервер';
    case 404: return 'Данные не получены';
    default: return `Неизвестная ошибка, код: ${code}`;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('.main')
);