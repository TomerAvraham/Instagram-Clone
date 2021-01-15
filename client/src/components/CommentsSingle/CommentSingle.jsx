import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./CommentSingle.css";

const CommentSingle = ({ comment }) => {
  return  (
    <div className="comment-container">
      <Avatar alt={comment.commentUserUsername} src={comment.profilePhotoUrl} />
      <p>{comment.commentUserUsername}</p>
      <p>{comment.comment}</p>
      <p>{comment.create_at}</p>
    </div>
  ) ;
};

export default CommentSingle;
