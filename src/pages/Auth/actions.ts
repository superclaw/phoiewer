import Cookies from "js-cookie";
import { TAction, TAsyncAction, TData } from "init/types";
import { authUser, getUser } from "init/unsplashAPI";

export const logIn: TAsyncAction = (code: string) => async function(dispatch) {
  const data: TData = await authUser(code);

  if (data.failed) {
    dispatch({
      type: 'REQUEST_FAILED_AUTH',
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
      type: 'REQUEST_FAILED_AUTH',
      message: data.message,
    });

  } else {
    dispatch({
      type: 'SET_USER',
      user: data,
    });
  }
};

export const updateAuth: TAction = () => ({
  type: 'UPDATE_AUTH',
});
