import Cookies from "js-cookie";
import { TReducer, TReducerFunc } from "init/types";

export type TAuthState = {
  readonly isLoggedIn: boolean;
};

const initState: TAuthState = {
  isLoggedIn: !!Cookies.get('unsplash_access_token'),
};

const checkAuth: TReducerFunc<TAuthState> = (state) => ({
  ...state,
  isLoggedIn: !!Cookies.get('unsplash_access_token'),
});

const reducer: TReducer<TAuthState> = (state = initState, action) => {
  switch (action.type) {
    case 'CHECK_AUTH': return checkAuth(state);
    default: return state;
  }
}

export default reducer;
