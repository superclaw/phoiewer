import { TReducer, TReducerFunc } from "init/types";
import { TPhotosList } from "init/UnsplashApi/types";

export enum Acts {
  LIKE_PHOTO = 'LIKE_PHOTO_LIST',
  LOAD_NEXT = 'LOAD_NEXT',
  IS_LOADING = 'IS_LOADING',
  LOADING_DONE = 'LOADING_DONE',
  REQUEST_FAILED = 'REQUEST_FAILED_LIST',
}

export type TPhotoListState = {
  list: TPhotosList;
  page: number;
  isLoading: boolean;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
};

const initState: TPhotoListState = {
  list: [],
  page: 0,
  isLoading: false,
  requestFailed: {
    status: false,
    errorMessage: '',
  },
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
    case Acts.LIKE_PHOTO: return updateLikes(state, action.data, action.id);
    case Acts.LOAD_NEXT: return loadList(state, action.data);
    case Acts.IS_LOADING: return setIsLoading(state);
    case Acts.LOADING_DONE: return unsetIsLoading(state);
    case Acts.REQUEST_FAILED: return setErrorMessage(state, action.message);
    default: return state;
  }
};

export default reducer;
