import React from "react";
import { unsplash, errorHandler } from "init/unsplashAPI";
import { toJson } from "unsplash-js";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../actions";

type TAccessToken = {
  access_token: string;
  created_at: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

const RedirectPage = () => {
  const dispatch = useDispatch();

  const l = window.location;
  const url = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + l.pathname.replace('/redirect', '/');
  const code = new URLSearchParams(l.search).get('code');

  if (!code) return <Redirect to="/" />;

  unsplash.auth.userAuthentication(code).then(res => {
    if (!res.ok) {
      alert(`Ошибка: ${errorHandler(res.status)}`);
      l.replace(url);
    }

    return toJson(res).catch((err: string) => {
      alert(`Ошибка: ${err}`);
      l.replace(url);
    }).then((json: TAccessToken) => {
      if (json.access_token) dispatch(logIn(json.access_token));
      l.replace(url);
    });
  });

  return <div>Идёт авторизация...</div>;
};

export default RedirectPage;
