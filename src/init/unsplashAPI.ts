import Unsplash, { UnsplashApi } from "unsplash-js";
import { toJson } from "unsplash-js";
import Cookies from "js-cookie";
import { ACCESS_KEY, SECRET_KEY, setRedirectUrl } from "./constants";
import { TLikeResponse, TPhotosCollection } from "./types";

const IS_LOCAL: boolean = window.location.hostname !== 'superclaw.github.io';

export const unsplash = new Unsplash({
  accessKey: ACCESS_KEY,
  secret: SECRET_KEY,
  callbackUrl: setRedirectUrl(IS_LOCAL),
  bearerToken: Cookies.get('unsplash_access_token'),
});

export const authenticationUrl: string = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos",
  "write_likes",
]);

export const errorHandler = (code: number): string => {
  switch (code) {
    case 400:
      return 'Код авторизации недействителен';
    case 401:
      return 'Вы не авторизованы или срок действия авторизации истёк';
    case 403:
      return 'Превышен лимит запросов на сервер';
    case 404:
      return 'Данные не получены';
    default:
      return `Неизвестная ошибка, код: ${code}`;
  }
};

export const listPhotos: UnsplashApi.Photo['listPhotos'] =
  (page, perPage, orderBy) =>

    unsplash.photos.listPhotos(page, perPage, orderBy).then(res => {

      if (!res.ok) return {
        failed: true,
        message: errorHandler(res.status),
      }

      return toJson(res).catch((err: string) => ({
        failed: true,
        message: err,
      })).then((json: TPhotosCollection) => json);
    });

const likePhoto: UnsplashApi.Photo['likePhoto'] = (id) => unsplash.photos.likePhoto(id);
const unlikePhoto: UnsplashApi.Photo['unlikePhoto'] = (id) => unsplash.photos.unlikePhoto(id);

export const updateLikes = (id: string, isLiked: boolean) => {
  const action = isLiked ? unlikePhoto : likePhoto;

  return action(id).then(res => {
    if (!res.ok) return {
      failed: true,
      message: errorHandler(res.status),
    }

    return toJson(res).catch((err: string) => ({
      failed: true,
      message: err,
    })).then((json: TLikeResponse) => json);
  });
};
