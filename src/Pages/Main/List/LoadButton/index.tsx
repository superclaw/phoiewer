import React from "react";
import { loadData } from "../../actions";
import { TLoadBtnProps } from "../../types";

const LoadButton = ({ isLoading, page, dispatch }: TLoadBtnProps) => isLoading ? (
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
