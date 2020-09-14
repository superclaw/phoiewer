import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPhoto, loadPhoto, likeDetails } from "./actions";
import { downloadEventTrigger } from "init/unsplashAPI";
import { TState } from "init/types";
import { TDetailsState } from "./reducer";
import PhotoFull from "modules/PhotoFull";
import UserInfo from "modules/UserInfo";
import DateString from "modules/DateString";
import Button from "modules/Button";
import Error from "modules/Error";
import styles from "./details.module.scss";

type ParamsType = {
  id: string;
};

const Details = () => {
  const { id } = useParams<ParamsType>();
  const history = useHistory();
  const state = useSelector(({ details }: TState<TDetailsState>) => details);
  const { photo, requestFailed } = state;
  const dispatch = useDispatch();
  const [isLoading, setLoadingDone] = useState(true);

  if (!photo && !requestFailed.status) {
    dispatch(loadPhoto(id));
  } else if (photo && photo.id !== id) {
    dispatch(clearPhoto());
  }

  const onClick = photo ? () => downloadEventTrigger(photo) : () => {};

  return (
    <div className={styles.wrapper}>
      <div className={styles['wrapper__top']}>
        {
          isLoading && (
            <div className={styles['loading-container']}>
              <div className={styles.loading} />
            </div>
          )
        }
        <Button text="&#8592; Назад" onClick={history.goBack} className={styles['back-bth']} />
      </div>
      {
        requestFailed.status
          ? <Error header="Ошибка загрузки фотографии:" message={requestFailed.errorMessage} />
          : <PhotoFull photo={photo} onClick={onClick} onLoad={() => setLoadingDone(false)} />
      }
      {
        photo && (
          <div className={styles.info}>
            <UserInfo user={photo.user} externalStyles={styles['info__user']} />
            <div className={styles['info__likes']}>
              <Button
                type="like"
                className={styles['info__like-btn']}
                isLiked={photo.liked_by_user}
                onClick={() => dispatch(likeDetails(photo.id, photo.liked_by_user))}
              />
              <span>{photo.likes}</span>
            </div>
            <div className={styles['info__date']}>
              Дата публикации: <DateString date={photo.created_at} short={false} />
            </div>
            <div className={styles['info__download']}>
              <h3>Скачать:</h3>
              <ul className={styles.download}>
                <li className={styles['download__item']}>
                  <Button
                    type="download"
                    className={styles['download__btn']}
                    text="Маленький"
                    id={photo.id}
                    width="small"
                    onClick={onClick}
                  />
                </li>
                <li className={styles['download__item']}>
                  <Button
                    type="download"
                    className={styles['download__btn']}
                    text="Средний"
                    id={photo.id}
                    width="medium"
                    onClick={onClick}
                  />
                </li>
                <li className={styles['download__item']}>
                  <Button
                    type="download"
                    className={styles['download__btn']}
                    text="Большой"
                    id={photo.id}
                    width="large"
                    onClick={onClick}
                  />
                </li>
                <li className={styles['download__item']}>
                  <Button
                    type="download"
                    className={styles['download__btn']}
                    text="Огромный"
                    id={photo.id}
                    width="extra-large"
                    onClick={onClick}
                  />
                </li>
                <li className={styles['download__item']}>
                  <Button
                    type="download"
                    className={styles['download__btn']}
                    text="Исходный"
                    id={photo.id}
                    onClick={onClick}
                  />
                </li>
              </ul>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Details;
