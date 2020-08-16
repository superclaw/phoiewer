import React from "react";
import "./index.css";

const LoadButton = ({isLoading, page, loadData}) => isLoading ? (
    <div className="loading-icon">
      Загрузка...
    </div>
) : (
    <button
        className="load-next"
        onClick={() => {
          loadData(page);
        }}>
      Загрузить ещё...
    </button>
);

export default LoadButton;