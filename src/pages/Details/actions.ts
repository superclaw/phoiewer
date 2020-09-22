import { getPhoto, updateLikes } from "init/UnsplashApi";
import { TAction, TAsyncAction, TData } from "init/types";
import { Acts } from "./reducer";

export const clearPhoto: TAction = () => ({
  type: Acts.CLEAR_DATA,
});

export const loadPhoto: TAsyncAction = (id: string) =>
  async function (dispatch) {

    const data: TData = await getPhoto(id);

    if (data.failed) {
      dispatch({
        type: Acts.REQUEST_FAILED,
        message: data.message,
      });

    } else {
      dispatch({
        type: Acts.LOAD_PHOTO,
        data: data,
      });
    }
  };

export const likeDetails: TAsyncAction = (id: string, isLiked: boolean) =>
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
      });
    }
  };
