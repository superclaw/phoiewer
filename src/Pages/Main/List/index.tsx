import React from "react";
import { Link } from "react-router-dom";
import { loadData, likePhotoList } from "../actions";
import { Dispatch } from "redux";
import { TPhotoListProps } from "../types";

import LikeButton from "../../../modules/LikeButton";

class List extends React.Component<TPhotoListProps> {
  private readonly dispatch: Dispatch<any>;

  constructor(props: TPhotoListProps) {
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
                    <li key={i} className="item">
                      <Link to={`/photo-${el.id}`}>
                        <img className="img" src={el.urls.thumb} alt={el.alt_description}/>
                      </Link>
                      <LikeButton
                        i={i}
                        el={el}
                        action={likePhotoList} />
                    </li>
                )
            )
          }
        </ul>
    )
  }
}

export default List;