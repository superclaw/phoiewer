import {unsplash, errorHandler} from "../index";
import {toJson} from "unsplash-js/lib/unsplash";
import Cookies from "js-cookie";

export const logIn = accessToken => {
  Cookies.set('unsplash_access_token', accessToken);

  return {
    type: 'CHECK_AUTH',
  };
};

export const logOut = () => {
  Cookies.remove('unsplash_access_token');

  return {
    type: 'CHECK_AUTH',
  };
};

export const loadData = i => async function(dispatch) {
  dispatch({
    type: 'IS_LOADING',
  });

  const data = await unsplash.photos.listPhotos(i, 15, "latest").then(res => {
    if (!res.ok) return {
      failed: true,
      message: errorHandler(res.status),
    }

    return toJson(res).catch((err) => ({
      failed: true,
      message: err,
    })).then(json => json);
  });

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

export const likePhoto = (id, isLiked, key) => async function(dispatch) {
  const action = isLiked ? unsplash.photos.unlikePhoto : unsplash.photos.likePhoto;

  const data = await action(id).then(res => {
    if (!res.ok) return {
      failed: true,
      message: errorHandler(res.status),
    }

    return toJson(res).catch((err) => ({
      failed: true,
      message: err,
    })).then(json => json);
  });

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
}