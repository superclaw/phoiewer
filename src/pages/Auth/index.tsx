import React from "react";
import { Redirect } from "react-router-dom";
import { authenticationUrl } from "init/unsplashAPI";
import { useAuth } from "init/hooks";
import { useSelector } from "react-redux";
import { TState } from "init/types";
import { TAuthState } from "./reducer";
import Button from "modules/Button";
import Error from "modules/Error";
import styles from "./auth.module.scss";

const Auth = () => {
  const requestFailed = useSelector(({ login }: TState<TAuthState>) => login.requestFailed);

  return useAuth().isLoggedIn ? <Redirect to="/" /> : (
    <div className={styles.auth}>
      <div className={styles['auth__wrapper']}>
        {
          requestFailed.status && <Error
              header={'Ошибка авторизации:'}
              message={requestFailed.errorMessage}
              className={styles.error}
          />
        }
        <h2 className={styles.message}>
          Для просмотра этой страницы необходимо авторизоваться
        </h2>
        <Button className={styles['login-btn']} text="Войти" onClick={() => {
          window.location.replace(authenticationUrl);
        }} />
      </div>
    </div>
  )
};

export default Auth;
