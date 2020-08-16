import React from "react";
import {Link} from "react-router-dom";
import "./index.css";
import LikeButton from "./LikeButton";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.loadData = props.loadData.bind(this);
  }

  componentDidMount() {
    if (!this.props.page) this.loadData(1);
  }

  render() {
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
                          requestFailed={this.props.requestFailed}
                          likePhoto={this.props.likePhoto}
                          i={i}
                          id={el.id}
                          likes={el.likes}
                          likedByUser={el.liked_by_user} />
                    </li>
                )
            )
          }
        </ul>
    )
  }
}

export default List;