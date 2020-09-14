import React from "react";
import { TUser } from "init/UnsplashApi/types";
import classNames from "classnames";
import internalStyles from "./userinfo.module.scss";

type PropTypes = {
  user: TUser;
  externalStyles?: any;
  onFocus?: any;
  onBlur?: any;
};

const UserInfo = ({ user, externalStyles, onFocus, onBlur }: PropTypes) => {
  const linkStyles = classNames(internalStyles.link, externalStyles && externalStyles['userinfo__link']);
  const avatarStyles = classNames(internalStyles.avatar, externalStyles && externalStyles['userinfo__avatar']);
  const nameStyles = classNames(internalStyles.name, externalStyles && externalStyles['userinfo__name']);

  return (
    <a
      className={linkStyles}
      href={`https://unsplash.com/@${user.username}?utm_source=phoiewer&utm_medium=referral`}
      target="_blank"
      rel="noopener noreferrer"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <img className={avatarStyles} src={user.profile_image.small} alt={user.name} />
      <span className={nameStyles}>
        {user.name}
      </span>
    </a>
  );
};

export default UserInfo;
