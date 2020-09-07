import React from "react";
import { TUser } from "init/unsplashAPI";
import styles from "./userinfo.module.scss";

type PropTypes = {
  user: TUser;
};

const UserInfo = ({ user }: PropTypes) => (
  <a className={styles.link} href={`https://unsplash.com/@${user.username}`} target="__blank">
    <img className={styles.avatar} src={user.profile_image.small} alt={user.name} />
    <span className={styles.name}>{user.name}</span>
  </a>
);

export default UserInfo;
