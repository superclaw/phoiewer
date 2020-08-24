import React from "react";
import { useDispatch } from "react-redux";
import { TLikeBtnProps} from "./types";

const LikeButton = ({ i = 0, el, action }: TLikeBtnProps) => {
  const dispatch = useDispatch();
  const { id, likes, liked_by_user } = el;

  return (
      <div>
        <button onClick={() => dispatch(action(id, liked_by_user, i))}/>
        <span>{likes}</span>
      </div>
  )
};

export default LikeButton;
