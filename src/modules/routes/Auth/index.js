import React from "react";
import {Redirect} from "react-router-dom";
import {authenticationUrl} from "../../../index";

const Auth = ({isLoggedIn}) => isLoggedIn ? <Redirect to="/"/> : (
    <div>
      <p>
        Для просмотра этой страницы необходимо авторизоваться.
      </p>
      <button onClick={() => window.location.replace(authenticationUrl)}>Войти</button>
    </div>
);

export default Auth;