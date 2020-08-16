import React from "react";
import {unsplash, errorHandler} from "../../../index";
import {toJson} from "unsplash-js/lib/unsplash";
import {Redirect} from "react-router-dom";

const RedirectPage = ({logIn}) => {
  const l = window.location;
  const url = l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + l.pathname.replace('/redirect', '/');
  const code = new URLSearchParams(l.search).get('code');

  if (!code) return <Redirect to="/" />;

  unsplash.auth.userAuthentication(code).then(res => {
    if (!res.ok) {
      alert(`Ошибка: ${errorHandler(res.status)}`);
      l.replace(url);
    }

    return toJson(res).catch(err => {
      alert(`Ошибка: ${err}`);
      l.replace(url);
    }).then(json => {
      if (json.access_token) logIn(json.access_token);
      l.replace(url);
    });
  });

  return <div>Идёт авторизация...</div>;
};

export default RedirectPage;