import React, { useState } from "react";
import { TPhoto } from "init/UnsplashApi/types";
import styles from "./photo-preview.module.scss";

type PropsType = {
  el: TPhoto;
  screenSize?: number;
  onLoad: () => number;
};

const PhotoPreview = ({ el, onLoad, screenSize }: PropsType) => {
  const [isLoading, setLoadingDone] = useState(true);
  const loadHandler = () => {
    onLoad();
    setLoadingDone(false);
  };

  const containerWidth = screenSize ? (
    screenSize <= 400 ? screenSize :
    screenSize <= 768 ? 400 :
    screenSize <= 1024 ? (768 - 30) / 2 :
    screenSize <= 1366 ? (1000 - 60) / 3 :
    400
  ) : undefined;

  const containerSize = containerWidth ? {
    width: containerWidth,
    height: el.height / (el.width / containerWidth),
  } : {};

  return (
    <div className={styles.container} style={containerSize}>
      {
        isLoading && <div className={styles.loading} />
      }
      <img className={styles.img} src={el.urls.small} alt={el.alt_description} onLoad={loadHandler} />
    </div>
  );
};

export default PhotoPreview;
