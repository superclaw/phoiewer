import React from "react";
import { useDispatch } from "react-redux";
import { TAsyncAction } from "../../init/types";
import { TPhoto } from "../../init/unsplashAPI";

type PropsType = {
  i?: number;
  el: TPhoto;
  action: TAsyncAction;
};

const LikeButton = ({ i = 0, el, action }: PropsType) => {
  const dispatch = useDispatch();
  const { id, likes, liked_by_user } = el;

  return (
      <div>
        <button onClick={() => dispatch(action(id, liked_by_user, i))}/>
        <span>{likes}</span>
      </div>
  );
};

export default LikeButton;
