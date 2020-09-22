import { listPhotos, updateLikes } from "init/UnsplashApi";
import { TAsyncAction, TData } from "init/types";
import { Acts } from "./reducer";

export const loadData: TAsyncAction = (i: number) =>
  async function (dispatch) {

    dispatch({
      type: Acts.IS_LOADING,
    });

    const data: TData = await listPhotos(++i, 24, "latest");

    if (data.failed) {
      dispatch({
        type: Acts.REQUEST_FAILED,
        message: data.message,
      });

    } else {
      dispatch({
        type: Acts.LOAD_NEXT,
        data: data,
      });
    }
  };

export const likePhotoList: TAsyncAction = (id: string, isLiked: boolean) =>
  async function (dispatch) {

    const data: TData = await updateLikes(id, isLiked);

    if (data.failed) {
      dispatch({
        type: Acts.REQUEST_FAILED,
        message: data.message,
      });

    } else {
      dispatch({
        type: Acts.LIKE_PHOTO,
        data: data,
        id: id,
      });
    }
  };

export const finishLoading = () => ({
  type: Acts.LOADING_DONE,
});
