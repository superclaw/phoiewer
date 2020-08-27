import { getPhoto } from "../../init/unsplashAPI";
import { TAction, TAsyncAction, TData } from "../../init/types";

export const clearPhoto: TAction = () => ({
  type: 'CLEAR_DATA',
});

export const loadPhoto: TAsyncAction = (id: string) =>
  async function (dispatch) {

    const data: TData = await getPhoto(id);

    if (data.failed) {
      dispatch({
        type: 'REQUEST_FAILED',
        message: data.message,
      });

    } else {
      dispatch({
        type: 'LOAD_PHOTO',
        data: data,
      });
    }
  };
