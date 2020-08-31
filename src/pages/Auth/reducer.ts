import Cookies from "js-cookie";
import { TReducer, TReducerFunc } from "init/types";
import { TUser } from "../../init/unsplashAPI";

export type TAuthState = {
  isLoggedIn: boolean;
  user?: TUser;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
};

const initState: TAuthState = {
  isLoggedIn: !!Cookies.get('unsplash_access_token'),
  requestFailed: {
    status: false,
    errorMessage: '',
  },
};

const updateAuth: TReducerFunc<TAuthState> = (state) => ({
  ...state,
  isLoggedIn: !!Cookies.get('unsplash_access_token'),
  requestFailed: {
    status: false,
    errorMessage: '',
  },
});

const setUser: TReducerFunc<TAuthState> = (state, { user }) => ({
  ...state,
  user,
});

const setErrorMessage: TReducerFunc<TAuthState> = (state, { message }) => ({
  ...state,
  requestFailed: {
    status: true,
    errorMessage: message,
  },
});

const reducer: TReducer<TAuthState> = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_AUTH': return updateAuth(state);
    case 'SET_USER': return setUser(state, action);
    case 'REQUEST_FAILED_AUTH': return setErrorMessage(state, action);
    default: return state;
  }
}

export default reducer;
