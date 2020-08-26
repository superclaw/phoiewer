import React from "react";
import { loadData } from "../../actions";
import { Dispatch } from "redux";

type PropsType = {
  isLoading: boolean;
  page: number;
  dispatch: Dispatch<any>;
};

const LoadButton = ({ isLoading, page, dispatch }: PropsType) => isLoading ? (
    <div className="loading-icon">
      Загрузка...
    </div>
) : (
    <button
        className="load-next"
        onClick={() => {
          dispatch(loadData(page));
        }}>
      Загрузить ещё...
    </button>
);

export default LoadButton;
