import React from "react";
import { useDispatch } from "react-redux";
import { loadData } from "../actions";

type PropsType = {
  page: number;
};

const LoadButton = ({ page }: PropsType) => {
  const dispatch = useDispatch();

  return (
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
