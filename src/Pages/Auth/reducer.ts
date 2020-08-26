import Cookies from "js-cookie";
import { TActionReturns, TReducerFunc } from "../../init/types";

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

const reducer = (state = initState, action: TActionReturns): TAuthState => {
  switch (action.type) {
    case 'CHECK_AUTH': return checkAuth(state);
    default: return state;
  }
}

export default reducer;
