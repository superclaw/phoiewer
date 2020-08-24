import { TPhotoListState } from "./types";
import { TActionReturns, TReducerFunc } from "../../init/types";

const initState: TPhotoListState = {
  list: [],
  page: 0,
  isLoading: false,
  requestFailed: {
    status: false,
    errorMessage: '',
  },
};

const updateLikes: TReducerFunc<TPhotoListState> = (state, { photo }, key) => {
  const newList = [ ...state.list ];
  newList[key] = photo;

  return {
    ...state,
    list: newList,
  };
}

const loadList: TReducerFunc<TPhotoListState> = (state, data) => {
  let {list, page} = state;
  page++;

  return {
    ...state,
    page: page,
    list: [
        ...list,
        ...data,
    ],
    isLoading: false,
    requestFailed: {
      ...state.requestFailed,
      status: false,
    },
  };
};

const setErrorMessage: TReducerFunc<TPhotoListState> = (state, message) => ({
  ...state,
  isLoading: false,
  requestFailed: {
    ...state.requestFailed,
    status: true,
    errorMessage: message,
  },
});

const toggleIsLoading: TReducerFunc<TPhotoListState> = (state) => {
  return {
    ...state,
    isLoading: true,
    requestFailed: {
      ...state.requestFailed,
      status: false,
    },
  };
};

const reducer = (state = initState, action: TActionReturns): TPhotoListState => {
  switch (action.type) {
    case 'LIKE_PHOTO': return updateLikes(state, action.data, action.key);
    case 'LOAD_NEXT': return loadList(state, action.data);
    case 'IS_LOADING': return toggleIsLoading(state);
    case 'REQUEST_FAILED': return setErrorMessage(state, action.message);
    default: return state;
  }
};

export default reducer;
