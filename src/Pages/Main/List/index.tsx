import React from "react";
import { loadData, likePhotoList } from "../actions";
import { Dispatch as IDispatch } from "redux";
import { TPhotosCollection } from "../../../init/unsplashAPI";
import PhotoPreview from "../../../modules/PhotoPreview";
import UserInfo from "../../../modules/UserInfo";
import LikeButton from "../../../modules/LikeButton";

type PropsType = {
  dispatch: IDispatch<any>;
  list: TPhotosCollection;
  page: number;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
};

class List extends React.Component<PropsType> {
  private readonly dispatch: IDispatch<any>;

  public constructor(props: PropsType) {
    super(props);
    this.dispatch = props.dispatch.bind(this);
  }

  public componentDidMount() {
    if (!this.props.page) this.dispatch(loadData(0));
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
                    </li>
                )
            )
          }
        </ul>
    )
  }
}

export default List;
