import React from "react";
import { TPhoto } from "init/unsplashAPI";
import styles from "./photofull.module.scss";

type PropsType = {
  photo: TPhoto | undefined;
  onClick?: any;
  onLoad?: any;
};

const PhotoFull = ({ photo, onClick, onLoad }: PropsType) => {

  return !photo ? <div /> : (
    <div className={styles.container}>
      <a
        href={photo.urls.full}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        <img
          src={photo.urls.full}
          alt={photo.alt_description}
          className={styles.img}
          onLoad={onLoad}
        />
      </a>
    </div>
  );
};

export default PhotoFull;
