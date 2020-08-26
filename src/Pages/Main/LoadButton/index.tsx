import React from "react";
import { useDispatch } from "react-redux";
import { loadData } from "../actions";

type PropsType = {
  isLoading: boolean;
  page: number;
};

const LoadButton = ({ isLoading, page }: PropsType) => {
  const dispatch = useDispatch();

  return isLoading ? (
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
  )
};

export default LoadButton;
