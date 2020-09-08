import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "init/hooks";
import { useDispatch } from "react-redux";
import { loadUser, logOut } from "pages/Auth/actions";
import UserInfo from "modules/UserInfo";
import Button from "modules/Button";
import logoMin from "assets/logo-min.png";
import logoBig from "assets/logo.png";
import styles from "./header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const auth = useAuth();

  if (!auth.user && !auth.requestFailed.status && auth.isLoggedIn) dispatch(loadUser());

  return (
    <header className={styles.header}>
      <div className={styles['header__wrapper']}>
        <div className={styles.userinfo}>
          {
            auth.user
              ? <UserInfo user={auth.user} externalStyles={styles} />
              : <div className={styles.loading} />
          }
        </div>
        <Link className={styles.logo} to="/">
          <picture>
            <source srcSet={logoBig} media="(min-width: 769px)" />
            <img src={logoMin} alt="Phoiewer" />
          </picture>
        </Link>
        <Button className={styles['logout-btn']} text="Выйти" onClick={() => dispatch(logOut())} />
      </div>
    </header>
  );
};

export default Header;
