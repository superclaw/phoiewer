import Unsplash, { UnsplashApi } from "unsplash-js";
import { toJson } from "unsplash-js";
import Cookies from "js-cookie";
import { ACCESS_KEY, SECRET_KEY, setRedirectUrl } from "./constants";

export type TUser = {
  accepted_tos: boolean;
  bio: string | null;
  first_name: string;
  id: string;
  instagram_username: string | null;
  last_name: string | null;
  links: {
    [n: string]: string;
  };
  location: string | null;
  name: string;
  portfolio_url: string | null;
  profile_image: {
    large: string;
    medium: string;
    small: string;
  };
  total_collection: number;
  total_likes: number;
  total_photos: number;
  twitter_username: string | null;
  updated_at: string;
  username: string;
};

export type TPhoto = {
  alt_description: any;
  categories: any[];
  color: string | null;
  created_at: string;
  current_user_collection: any[];
  description: string | null;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: {
    [n: string]: string;
  };
  promoted_at: string | null;
  sponsorship: {
    [n: string]: any;
  };
  updated_at: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: TUser;
  width: number;
};

export type TPhotosCollection = TPhoto[];

export type TLikeResponse = {
  photo: TPhoto;
  user: TUser;
};

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
