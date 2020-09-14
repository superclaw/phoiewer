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
    download_location: string;
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

export type TPhotosList = TPhoto[];

export type TLikeResponse = {
  photo: TPhoto;
  user: TUser;
};

export type TAccessToken = {
  access_token: string;
  created_at: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};
