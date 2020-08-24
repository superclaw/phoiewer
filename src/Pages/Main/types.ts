import { TPhotosCollection } from "../../init/types";
import { Dispatch } from "redux";

export type TPhotoListState = {
  list: TPhotosCollection;
  page: number;
  isLoading: boolean;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
};

export type TPhotoListProps = {
  dispatch: Dispatch<any>;
  list: TPhotosCollection;
  page: number;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
};

export type TLoadBtnProps = {
  isLoading: boolean;
  page: number;
  dispatch: Dispatch<any>;
};
