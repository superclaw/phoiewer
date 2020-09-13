import React from "react";
import { likePhotoList, loadData, finishLoading } from "../actions";
import { downloadEventTrigger, TPhotosList } from "init/unsplashAPI";
import { Dispatch as IDispatch } from "redux";
import { Link } from "react-router-dom";
import PhotoPreview from "modules/PhotoPreview";
import UserInfo from "modules/UserInfo";
import DateString from "modules/DateString";
import Button from "modules/Button";
import Error from "modules/Error";
import classNames from "classnames";
import styles from "./list.module.scss";

type PropsType = {
  dispatch: IDispatch<any>;
  list: TPhotosList;
  page: number;
  isLoading: boolean;
  requestFailed: {
    status: boolean;
    errorMessage: string;
  };
  screenSize: number;
  resizeHandler: () => number;
};

class List extends React.Component<PropsType, {focused: {[n: string]: boolean}}> {
  private readonly setFocused: (id: string, val: boolean) => void;
  private readonly dispatch: IDispatch<any>;
  private readonly scrollHandler: () => void;
  private readonly counter: () => () => number;
  private readonly getCount: () => number;
  private layoutCols: number;

  public constructor(props: PropsType) {
    super(props);

    this.state = {
      focused: {},
    };

    this.setFocused = (id, val) => {
      const state = { ...this.state }
      state.focused[id] = val;
      this.setState(state);
    };

    this.dispatch = props.dispatch.bind(this);
    this.scrollHandler = () => {
      const scrollPosition = document.documentElement.offsetHeight - 2000;

      if (
        !this.props.requestFailed.status &&
        !!this.props.page &&
        !this.props.isLoading &&
        (window.scrollY >= scrollPosition)
      ) this.dispatch(loadData(this.props.page));
    };

    this.counter = () => {
      let count = 0;
      return () => {
        if (count === 23) {
          this.dispatch(finishLoading());
          count = -1;
        }

        return ++count;
      };
    };

    this.getCount = this.counter();
    this.layoutCols = 1;
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
                <li className={styles['list__item']} key={nth + i}>
                  <div
                    className={classNames(styles['list__info'], styles['list__info--top'])}
                    style={this.state.focused[el.id] ? {opacity: 1} : {}}
                  >
                    <UserInfo
                      user={el.user}
                      onFocus={() => this.setFocused(el.id, true)}
                      onBlur={() => this.setFocused(el.id, false)}
                    />
                  </div>
                  <Link to={`/photo-${el.id}`} className={styles['list__link']}>
                    <PhotoPreview el={el} onLoad={() => this.getCount()} screenSize={this.props.screenSize} />
                  </Link>
                  <div
                    className={classNames(styles['list__info'], styles['list__info--bottom'])}
                    style={this.state.focused[el.id] ? {opacity: 1} : {}}
                  >
                    <DateString className={styles.date} date={el.created_at} short={true} />
                    <a
                      href={`https://unsplash.com/photos/${el.id}/download?force=true`}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className={styles['download-btn']}
                      onClick={() => downloadEventTrigger(el)}
                      onFocus={() => this.setFocused(el.id, true)}
                      onBlur={() => this.setFocused(el.id, false)}
                    >
                      Скачать
                    </a>
                    <Button
                      type="like"
                      isLiked={el.liked_by_user}
                      onClick={() => this.dispatch(likePhotoList(el.id, el.liked_by_user))}
                      onFocus={() => this.setFocused(el.id, true)}
                      onBlur={() => this.setFocused(el.id, false)}
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
    window.addEventListener('resize', this.props.resizeHandler);
    window.addEventListener('scroll', this.scrollHandler);

    if (this.props.list.length < 1) this.dispatch(loadData(0));
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.props.resizeHandler);
    window.removeEventListener('scroll', this.scrollHandler);
  }

  public render() {
    return this.props.requestFailed.status
      ? <Error header={'Ошибка загрузки:'} message={this.props.requestFailed.errorMessage} />
      : <div className={styles['container']}>{this.createLayout()}</div>;
  }
}

export default List;
