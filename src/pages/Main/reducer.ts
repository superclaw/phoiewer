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

const updateLikes: TReducerFunc<TPhotoListState> = (state, { photo }, id) => {
  const newList = [ ...state.list ];

  newList.forEach(el => {
    if (el.id === id) {
      el.likes = photo.likes;
      el.liked_by_user = photo.liked_by_user;
    }
  });

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

const setIsLoading: TReducerFunc<TPhotoListState> = state => {
  return {
    ...state,
    isLoading: true,
    requestFailed: {
      ...state.requestFailed,
      status: false,
    },
  };
};

const unsetIsLoading: TReducerFunc<TPhotoListState> = state => {
  return {
    ...state,
    isLoading: false,
  };
};

const reducer: TReducer<TPhotoListState> = (state = initState, action) => {
  switch (action.type) {
    case 'LIKE_PHOTO_LIST': return updateLikes(state, action.data, action.id);
    case 'LOAD_NEXT': return loadList(state, action.data);
    case 'IS_LOADING': return setIsLoading(state);
    case 'LOADING_DONE': return unsetIsLoading(state);
    case 'REQUEST_FAILED_LIST': return setErrorMessage(state, action.message);
    default: return state;
  }
};

export default reducer;
