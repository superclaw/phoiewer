import React from "react";
import { Link } from "react-router-dom";
import { TPhoto } from "init/unsplashAPI";
import styles from "./photo-preview.module.scss";

type PropsType = {
  el: TPhoto;
};

const PhotoPreview = ({ el }: PropsType) => (
  <Link to={`/photo-${el.id}`}>
    <img className={styles.img} src={el.urls.small} alt={el.alt_description} />
  </Link>
);

export default PhotoPreview;
