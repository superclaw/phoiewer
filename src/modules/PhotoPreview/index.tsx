import React from "react";
import { Link } from "react-router-dom";
import { TPhoto } from "../../init/unsplashAPI";

type PropsType = {
  el: TPhoto;
};

const PhotoPreview = ({ el }: PropsType) => (
  <Link to={`/photo-${el.id}`}>
    <img className="img" src={el.urls.thumb} alt={el.alt_description} />
  </Link>
);

export default PhotoPreview;
