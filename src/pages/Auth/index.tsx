import React from "react";
import { Redirect } from "react-router-dom";
import { authenticationUrl } from "init/unsplashAPI";
import { useAuth } from "init/hooks";
import Button from "modules/Button";
import styles from "./auth.module.scss";

const Auth = () => useAuth().isLoggedIn ? <Redirect to="/" /> : (
    <div className={styles.wrapper}>
      <p>
        Для просмотра этой страницы необходимо авторизоваться.
      </p>
      <Button text="Войти" onClick={() => window.location.replace(authenticationUrl)} />
    </div>
);

export default Auth;
