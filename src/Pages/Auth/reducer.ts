import Cookies from "js-cookie";
import { TAuthState } from "./types";
import { TActionReturns, TReducerFunc } from "../../init/types";

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
