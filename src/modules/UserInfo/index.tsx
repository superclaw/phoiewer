import React from "react";
import { TUser } from "../../init/unsplashAPI";

type PropTypes = {
  user: TUser;
};

const UserInfo = ({ user }: PropTypes) => (
  <a href={`https://unsplash.com/@${user.username}`} target="__blank">
    <img src={user.profile_image.small} alt={user.name} />
    <span>{user.name}</span>
  </a>
);

export default UserInfo;
