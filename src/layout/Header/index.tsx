import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "init/hooks";
import { useDispatch } from "react-redux";
import { loadUser, logOut } from "pages/Auth/actions";
import UserInfo from "modules/UserInfo";
import Button from "modules/Button";
import logoMin from "assets/logo-min.png";
import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  if (!auth.user && !auth.requestFailed.status && auth.isLoggedIn) dispatch(loadUser());

  return (
    <header className={styles.wrapper}>
      {
        auth.user
          ? <UserInfo user={auth.user} />
          : auth.requestFailed.status
            ? <div>{auth.requestFailed.errorMessage}</div>
            : <div>Загрузка...</div>
      }
      <Link to="/">
        <img src={logoMin} alt="Phoiewer" />
      </Link>
      <Button text="Выйти" onClick={() => dispatch(logOut())} />
    </header>
  );
};

export default Header;
