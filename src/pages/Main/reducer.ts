import { TReducer, TReducerFunc } from "init/types";
import { TPhotosList } from "init/unsplashAPI";

export type TPhotoListState = {
  list: TPhotosList;
  page: number;
  isLoading: boolean;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
  screenSize: number;
};

const initState: TPhotoListState = {
  list: [],
  page: 0,
  isLoading: false,
  requestFailed: {
    status: false,
    errorMessage: '',
  },
  screenSize: window.innerWidth,
};

const updateLikes: TReducerFunc<TPhotoListState> = (state, { photo }, key) => {
  const newList = [ ...state.list ];
  newList[key].likes = photo.likes;
  newList[key].liked_by_user = photo.liked_by_user;

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

const toggleIsLoading: TReducerFunc<TPhotoListState> = state => {
  return {
    ...state,
    isLoading: true,
    requestFailed: {
      ...state.requestFailed,
      status: false,
    },
  };
};

const changeScreenSize: TReducerFunc<TPhotoListState> = state => ({
  ...state,
  screenSize: window.innerWidth,
});

const reducer: TReducer<TPhotoListState> = (state = initState, action) => {
  switch (action.type) {
    case 'LIKE_PHOTO_LIST': return updateLikes(state, action.data, action.key);
    case 'LOAD_NEXT': return loadList(state, action.data);
    case 'IS_LOADING': return toggleIsLoading(state);
    case 'REQUEST_FAILED_LIST': return setErrorMessage(state, action.message);
    case 'CHANGE_SCREEN_SIZE': return changeScreenSize(state);
    default: return state;
  }
};

export default reducer;
