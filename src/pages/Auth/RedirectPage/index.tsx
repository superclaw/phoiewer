import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "init/hooks";
import { logIn } from "../actions";
import { TState } from "init/types";
import { TAuthState } from "../reducer";

const RedirectPage = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const dispatch = useDispatch();
  const isFailed = useSelector(({ login }: TState<TAuthState>) => login.requestFailed.status);
  const isLoggedIn = useAuth().isLoggedIn;

  if (!code || isLoggedIn) {
    return <Redirect to="/"/>;

  } else if (isFailed) {
    return <Redirect to="/auth" />

  } else {
    dispatch(logIn(code));
    return <div>Идёт авторизация...</div>;
  }
};

export default RedirectPage;
