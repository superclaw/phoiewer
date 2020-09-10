import React from "react";
import { likePhotoList, loadData, handleResizeEvent } from "../actions";
import { downloadEventTrigger, TPhotosList } from "init/unsplashAPI";
import { TActionReturns } from "init/types";
import { Dispatch as IDispatch } from "redux";
import PhotoPreview from "modules/PhotoPreview";
import UserInfo from "modules/UserInfo";
import DateString from "modules/DateString";
import Button from "modules/Button";
import Error from "modules/Error";
import styles from "./list.module.scss";

type PropsType = {
  dispatch: IDispatch<any>;
  list: TPhotosList;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
  screenSize: number;
};

class List extends React.Component<PropsType> {
  private readonly dispatch: IDispatch<any>;
  private readonly resizeHandler: () => TActionReturns;
  private layoutCols: number;

  public constructor(props: PropsType) {
    super(props);

    this.layoutCols = 1;
    this.dispatch = props.dispatch.bind(this);
    this.resizeHandler = () => this.dispatch(handleResizeEvent());
  }

  public createLayout() {
    this.layoutCols = this.props.screenSize <= 768 ? 1 : this.props.screenSize <= 1024 ? 2 : 3;

    const createList = (nth: number) => {
      const items = [];

      for (let i = nth - 1; i < this.props.list.length; i += this.layoutCols) {
        items.push(this.props.list[i]);
      }

      return (
        <ul className={styles.list} key={nth}>
          {
            items.map((el, i) =>
              (
                <li className={styles['list__item']} key={i}>
                  <div className={styles['list__info-top']}>
                    <UserInfo user={el.user} />
                  </div>
                  <PhotoPreview el={el} />
                  <div className={styles['list__info-bottom']}>
                    <DateString className={styles.date} date={el.created_at} short={true} />
                    <a
                      href={`https://unsplash.com/photos/${el.id}/download?force=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className={styles['download-btn']}
                      onClick={() => downloadEventTrigger(el)}
                    >
                      Скачать
                    </a>
                    <Button
                      type="like"
                      isLiked={el.liked_by_user}
                      onClick={() => this.dispatch(likePhotoList(el.id, el.liked_by_user, i))}
                    />
                  </div>
                </li>
              )
            )
          }
        </ul>
      );
    }

    const layout = [];

    for (let i = 1; i <= this.layoutCols; i++) {
      layout.push(createList(i))
    }

    return layout.map(el => el);
  }

  public componentDidMount() {
    window.addEventListener('resize', this.resizeHandler);

    if (this.props.list.length < 1) this.dispatch(loadData(0));
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  public render() {
    return this.props.requestFailed.status
      ? <Error header={'Ошибка загрузки:'} message={this.props.requestFailed.errorMessage} />
      : <div className={styles['container']}>{this.createLayout()}</div>;
  }
}

export default List;
