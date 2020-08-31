import { getPhoto, updateLikes } from "init/unsplashAPI";
import { TAction, TAsyncAction, TData } from "init/types";

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

export const likeDetails: TAsyncAction = (id: string, isLiked: boolean) =>
  async function (dispatch) {

    const data: TData = await updateLikes(id, isLiked);

    if (data.failed) {
      dispatch({
        type: 'REQUEST_FAILED',
        message: data.message,
      });

    } else {
      dispatch({
        type: 'LIKE_PHOTO',
        data: data,
      });
    }
  };
