import Cookies from "js-cookie";
import { authUser, getUser } from "init/UnsplashApi";
import { TAction, TAsyncAction, TData } from "init/types";
import { Acts } from "./reducer";

export const logIn: TAsyncAction = (code: string) => async function(dispatch) {
  const data: TData = await authUser(code);

  if (data.failed) {
    dispatch({
      type: Acts.REQUEST_FAILED,
      message: data.message,
    });

  } else {
    Cookies.set('unsplash_access_token', data.accessToken, {expires: 31});
    dispatch(updateAuth());
    dispatch(loadUser());
  }
};

export const logOut: TAction = () => {
  Cookies.remove('unsplash_access_token');
  return updateAuth();
};

export const loadUser: TAsyncAction = () => async function(dispatch) {
  const data: TData = await getUser();

  if (data.failed) {
    dispatch({
      type: Acts.REQUEST_FAILED,
      message: data.message,
    });

  } else {
    dispatch({
      type: Acts.SET_USER,
      user: data,
    });
  }
};

export const updateAuth: TAction = () => ({
  type: Acts.UPDATE_AUTH,
});
