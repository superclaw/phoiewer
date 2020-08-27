import { TActionReturns, TReducerFunc } from "../../init/types";
import { TPhoto } from "../../init/unsplashAPI";

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

const setErrorMessage: TReducerFunc<TDetailsState> = (state, message) => ({
  ...state,
  requestFailed: {
    ...state.requestFailed,
    status: true,
    errorMessage: message,
  },
});

const reducer = (state = initState, action: TActionReturns): TDetailsState => {
  switch (action.type) {
    case 'CLEAR_DATA': return clearData(state);
    case 'LOAD_PHOTO': return updatePhoto(state, action.data);
    case 'REQUEST_FAILED': return setErrorMessage(state, action.message);
    default: return state;
  }
};

export default reducer;
