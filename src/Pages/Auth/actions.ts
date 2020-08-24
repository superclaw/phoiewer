import Cookies from "js-cookie";
import { TAction } from "../../init/types";

export const logIn: TAction = (accessToken: string) => {
  Cookies.set('unsplash_access_token', accessToken);

  return {
    type: 'CHECK_AUTH',
  };
};

export const logOut: TAction = () => {
  Cookies.remove('unsplash_access_token');

  return {
    type: 'CHECK_AUTH',
  };
};
