import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import CommentSingle from "../CommentsSingle/CommentSingle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { commentPost } from "../../redux/actions/postActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0px 15px 15px 15px",
  },
  commentInput: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textFiled: {
    width: "auto",
    minWidth: "70%",
  },
  moreLess: {
    cursor: "pointer",
    maxWidth: "50%",
  },
}));

const Comments = ({ comments, postId }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const dispatch = useDispatch();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handelAddComment = () => {
    if(`${document.location.href}`.split("/").pop() === ''){
      dispatch(commentPost(postId, commentInput));
      
    } else {
      dispatch(commentPost(postId, commentInput, true));

    }
    setCommentInput("");
  };

  const CommentInput = () => {
    return (
      <div className={classes.commentInput}>
        <TextField
          onChange={(e) => setCommentInput(e.target.value)}
          className={classes.textFiled}
          value={commentInput}
          label="Text Here..."
        />
        <Button
          onClick={handelAddComment}
          disabled={!commentInput}
          variant="contained"
          color="inherit"
        >
          Comment
        </Button>
      </div>
    );
  };

  return comments && comments.length >= 3 ? (
    <div className={classes.root}>
      <CommentSingle comment={comments[0]} />
      <CommentSingle comment={comments[1]} />
      <p className={classes.moreLess} onClick={handleExpandClick}>
        {!expanded
          ? `Show more ${comments.length - 2} comments..`
          : "Show Less.."}
      </p>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments.map((comment, i) => {
            if (i >= 2) {
              return <CommentSingle comment={comment} />;
            }
          })}
        </CardContent>
      </Collapse>
      {CommentInput()}
    </div>
  ) : (
    <div className={classes.root}>
      {comments &&
        comments.map((comment) => <CommentSingle comment={comment} />)}
      {CommentInput()}
    </div>
  );
};

export default Comments;
