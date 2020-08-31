import React from "react";
import { likePhotoList, loadData } from "../actions";
import { TPhotosList } from "init/unsplashAPI";
import { Dispatch } from "redux";
import PhotoPreview from "modules/PhotoPreview";
import UserInfo from "modules/UserInfo";
import DateString from "modules/DateString";
import Button from "modules/Button";

type PropsType = {
  dispatch: Dispatch<any>;
  list: TPhotosList;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
};

class List extends React.Component<PropsType> {
  private readonly dispatch: Dispatch<any>;

  public constructor(props: PropsType) {
    super(props);
    this.dispatch = props.dispatch.bind(this);
  }

  public componentDidMount() {
    if (this.props.list.length < 1) this.dispatch(loadData(0));
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
                        <Button type="like" onClick={() => this.dispatch(likePhotoList(el.id, el.liked_by_user, i))} />
                      </div>
                      <PhotoPreview el={el} />
                      <div>
                        <DateString date={el.created_at} short={true} />
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
