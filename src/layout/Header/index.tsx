import React from "react";
import { Redirect } from "react-router-dom";
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

  return !auth.isLoggedIn ? <Redirect to="/auth" /> : (
    <header className={styles.header}>
      <h1 className="visually-hidden">Phoiewer</h1>
      <div className={styles['header__wrapper']}>
        <div className={styles.userinfo}>
          {
            auth.user
              ? <UserInfo user={auth.user} externalStyles={styles} />
              : <div className={styles.loading} />
          }
        </div>
        <a
          className={styles.logo}
          href="https://unsplash.com/?utm_source=phoiewer&utm_medium=referral"
          target="_blank"
          rel="noopener noreferrer"
          title="Перейти на сайт unsplash.com"
        >
          <picture>
            <source srcSet={logoBig} media="(min-width: 769px)" />
            <img src={logoMin} alt="Phoiewer" />
          </picture>
        </a>
        <Button className={styles['logout-btn']} text="Выйти" onClick={() => dispatch(logOut())} />
      </div>
    </header>
  );
};

export default Header;
