import Cookies from "js-cookie";
import { TReducer, TReducerFunc } from "init/types";
import { TUser } from "init/UnsplashApi/types";

export enum Acts {
  UPDATE_AUTH = 'UPDATE_AUTH',
  SET_USER = 'SET_USER',
  REQUEST_FAILED = 'REQUEST_FAILED_AUTH',
}

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
    case Acts.UPDATE_AUTH: return updateAuth(state);
    case Acts.SET_USER: return setUser(state, action);
    case Acts.REQUEST_FAILED: return setErrorMessage(state, action);
    default: return state;
  }
}

export default reducer;
