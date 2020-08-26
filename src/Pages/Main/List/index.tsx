import React from "react";
import { likePhotoList } from "../actions";
import { TAsyncAction } from "../../../init/types";
import { TPhotosList } from "../../../init/unsplashAPI";
import PhotoPreview from "../../../modules/PhotoPreview";
import UserInfo from "../../../modules/UserInfo";
import LikeButton from "../../../modules/LikeButton";
import DateString from "../../../modules/DateString";

type PropsType = {
  action: TAsyncAction;
  list: TPhotosList;
  page: number;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
};

class List extends React.Component<PropsType> {
  private readonly action: TAsyncAction;

  public constructor(props: PropsType) {
    super(props);
    this.action = props.action.bind(this);
  }

  public componentDidMount() {
    if (!this.props.page) this.action(0);
  }

  public render() {
    return this.props.requestFailed.status ? <p>Ошибка загрузки: {this.props.requestFailed.errorMessage}</p> : (
        <ul>
          {
            this.props.list.map((el, i) =>
                (
                    <li key={i}>
                      <div>
                        <UserInfo user={el.user} />
                        <LikeButton
                          i={i}
                          el={el}
                          action={likePhotoList} />
                      </div>
                      <PhotoPreview el={el} />
                      <div>
                        Дата публикации: <DateString date={el.created_at} />
                      </div>
                    </li>
                )
            )
          }
        </ul>
    );
  }
}

export default List;
