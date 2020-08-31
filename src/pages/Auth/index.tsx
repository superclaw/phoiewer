import React from "react";
import { Redirect } from "react-router-dom";
import { authenticationUrl } from "init/unsplashAPI";
import { useAuth } from "init/hooks";
import { useSelector } from "react-redux";
import { TState } from "init/types";
import { TAuthState } from "./reducer";
import Button from "modules/Button";
import styles from "./auth.module.scss";

const Auth = () => {
  const requestFailed = useSelector(({ login }: TState<TAuthState>) => login.requestFailed);

  return useAuth().isLoggedIn ? <Redirect to="/" /> : (
    <div className={styles.wrapper}>
      {requestFailed.status && (
        <p>
          Ошибка авторизации: {requestFailed.errorMessage}
        </p>
      )}
      <p>
        Для просмотра этой страницы необходимо авторизоваться.
      </p>
      <Button text="Войти" onClick={() => {
        window.location.replace(authenticationUrl);
      }} />
    </div>
  )
};

export default Auth;
