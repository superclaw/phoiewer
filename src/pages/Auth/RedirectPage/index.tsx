import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "init/hooks";
import { logIn } from "../actions";
import styles from "../auth.module.scss";

const RedirectPage = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  const dispatch = useDispatch();
  const auth = useAuth();
  const isFailed = auth.requestFailed.status;
  const { isLoggedIn } = auth;

  if (!code || isLoggedIn) {
    return <Redirect to="/"/>;

  } else if (isFailed) {
    return <Redirect to="/auth" />

  } else {
    dispatch(logIn(code));
    return (
      <div className={styles.auth}>
        <h2 className={styles.message}>Идёт авторизация...</h2>
        <div className={styles.loading} />
      </div>
    );
  }
};

export default RedirectPage;
