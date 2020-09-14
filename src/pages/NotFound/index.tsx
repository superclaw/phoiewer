import React from "react";
import Layout from "layout";
import { useAuth } from "init/hooks";
import styles from "./not-found.module.scss";

const NotFound = () => {
  const path = window.location.pathname.replace('/phoiewer/build/', '/');
  const auth = useAuth();
  const children = (
    <div className={styles['not-found']}>
      <div className={styles['not-found__wrapper']}>
        <h2 className={styles.header}>404</h2>
        <p className={styles.message}>
          Страница <span className={styles['message__path']}>{path}</span> не найдена!
        </p>
      </div>
    </div>
  );

  return auth.isLoggedIn ? <Layout children={children} /> : children;
};

export default NotFound;
