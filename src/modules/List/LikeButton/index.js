import React from "react";

const LikeButton = ({likePhoto, i, id, likes, likedByUser}) => (
    <div>
      <button onClick={() => likePhoto(id, likedByUser, i)}/>
      <span>{likes}</span>
    </div>
);

export default LikeButton;