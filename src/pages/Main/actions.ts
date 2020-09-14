import { listPhotos, updateLikes } from "init/UnsplashApi";
import { TAsyncAction, TData } from "init/types";

export const loadData: TAsyncAction = (i: number) =>
  async function (dispatch) {

    dispatch({
      type: 'IS_LOADING',
    });

    const data: TData = await listPhotos(++i, 24, "latest");

    if (data.failed) {
      dispatch({
        type: 'REQUEST_FAILED_LIST',
        message: data.message,
      });

    } else {
      dispatch({
        type: 'LOAD_NEXT',
        data: data,
      });
    }
  };

export const likePhotoList: TAsyncAction = (id: string, isLiked: boolean) =>
  async function (dispatch) {

    const data: TData = await updateLikes(id, isLiked);

    if (data.failed) {
      dispatch({
        type: 'REQUEST_FAILED_LIST',
        message: data.message,
      });

    } else {
      dispatch({
        type: 'LIKE_PHOTO_LIST',
        data: data,
        id: id,
      });
    }
  };

export const finishLoading = () => ({
  type: 'LOADING_DONE',
});
