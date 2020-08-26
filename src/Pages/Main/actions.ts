import { listPhotos, updateLikes } from "../../init/unsplashAPI";
import { TAsyncAction, TData } from "../../init/types";

export const loadData: TAsyncAction = (i: number) =>
  async function (dispatch) {

    dispatch({
      type: 'IS_LOADING',
    });

    const data: TData = await listPhotos(++i, 15, "latest");

    if (data.failed) {
      dispatch({
        type: 'REQUEST_FAILED',
        message: data.message,
      });

    } else {
      dispatch({
        type: 'LOAD_NEXT',
        data: data,
      });
    }
  };

export const likePhotoList: TAsyncAction = (id: string, isLiked: boolean, key: number) =>
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
        key: key,
      });
    }
  };
