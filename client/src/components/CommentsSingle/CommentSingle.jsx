import React from "react";
import Avatar from "@material-ui/core/Avatar";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import "./CommentSingle.css";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const CommentSingle = ({ comment }) => {
  const classes = useStyles();
  return (
    <div className="comment-container">
      <Avatar
        alt={comment.commentUserUsername}
        src={comment.profilePhotoUrl}
        className={classes.avatar}
      />
      <p className="comment-username" >{comment.commentUserUsername}:</p>
      <p className="comment-comment" >{comment.comment}</p>
      <p className="comment-date">{moment(comment.create_at).fromNow()}</p>
    </div>
  );
};

export default CommentSingle;
