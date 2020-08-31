import { TReducer, TReducerFunc } from "init/types";
import { TPhoto } from "init/unsplashAPI";

export type TDetailsState = {
  photo?: TPhoto;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
};

const initState: TDetailsState = {
  requestFailed: {
    status: false,
    errorMessage: '',
  },
};

const clearData: TReducerFunc<TDetailsState> = state => ({
  ...state,
  photo: undefined,
  requestFailed: {
    status: false,
    errorMessage: '',
  },
});

const updatePhoto: TReducerFunc<TDetailsState> = (state, data) => ({
  ...state,
  photo: data,
});

const updateLikes: TReducerFunc<TDetailsState> = (state, { photo }) => {
  const newState: TDetailsState = {
    ...state,
  };

  if (newState.photo) {
    newState.photo.likes = photo.likes;
    newState.photo.liked_by_user = photo.liked_by_user;
  }

  return newState;
};

const setErrorMessage: TReducerFunc<TDetailsState> = (state, message) => ({
  ...state,
  requestFailed: {
    ...state.requestFailed,
    status: true,
    errorMessage: message,
  },
});

const reducer: TReducer<TDetailsState> = (state = initState, action) => {
  switch (action.type) {
    case 'CLEAR_DATA': return clearData(state);
    case 'LOAD_PHOTO': return updatePhoto(state, action.data);
    case 'LIKE_PHOTO': return updateLikes(state, action.data);
    case 'REQUEST_FAILED': return setErrorMessage(state, action.message);
    default: return state;
  }
};

export default reducer;
