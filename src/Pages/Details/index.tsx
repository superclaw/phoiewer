import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearPhoto, loadPhoto, likeDetails } from "./actions";
import { TState } from "../../init/types";
import { TDetailsState } from "./reducer";
import PhotoFull from "../../modules/PhotoFull";
import UserInfo from "../../modules/UserInfo";
import DateString from "../../modules/DateString";
import LikeButton from "../../modules/LikeButton";

type ParamsType = {
  id: string;
};

const Details = () => {
  const { id } = useParams<ParamsType>();
  const history = useHistory();
  const state = useSelector(({ details }: TState<TDetailsState>) => details);
  const dispatch = useDispatch();

  const { photo, requestFailed } = state;

  if (!photo && !requestFailed.status) {
    dispatch(loadPhoto(id));
  } else if (photo && photo.id !== id) {
    dispatch(clearPhoto());
  }

  return (
    <div>
      <button onClick={history.goBack}>Назад</button>
      {
        requestFailed.status ? (
          <div>
            Ошибка загрузки фотографии: {requestFailed.errorMessage}
          </div>
        ) : <PhotoFull photo={photo} />
      }
      {
        photo && (
          <div>
            <UserInfo user={photo.user} />
            <span>
              Дата публикации: <DateString date={photo.created_at} short={false} />
            </span>
            <LikeButton el={photo} action={likeDetails} />
          </div>
        )
      }
    </div>
  );
};

export default Details;
