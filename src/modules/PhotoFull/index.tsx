import React from "react";
import { TPhoto } from "init/unsplashAPI";

type PropsType = {
  photo: TPhoto | undefined;
};

const PhotoFull = ({ photo }: PropsType) => !photo ? <div>Загрузка...</div> : (
  <div>
    <img src={photo.urls.full} alt={photo.alt_description} />
  </div>
);

export default PhotoFull;
