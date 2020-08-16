import Cookies from "js-cookie";

const initState = {
  isLoggedIn: !!Cookies.get('unsplash_access_token'),
};

const checkAuth = state => ({
  ...state,
  isLoggedIn: !!Cookies.get('unsplash_access_token'),
});

const login = (state = initState, action) => {
  switch (action.type) {
    case 'CHECK_AUTH': return checkAuth(state);
    default: return state;
  }
}

export default login;