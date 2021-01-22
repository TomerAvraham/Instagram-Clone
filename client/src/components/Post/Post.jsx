import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import Comments from "../Comments/Comments";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  unlikePost,
  deletePost,
} from "../../redux/actions/postActions";
import "./Post.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "30px 0",
    maxWidth: "500px",
    minWidth: "400px",
    minHeight: "550px",
    borderRadius: "8px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: "20px",
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let isCurrUserLike = post?.likes.some((e) => e.userId === userInfo.user.id);

  const [liked, setLiked] = useState(isCurrUserLike);

  const LikePost = () => {
    setLiked(!liked);
    dispatch(likePost(post.id));
  };

  const unLikePost = () => {
    setLiked(!liked);
    dispatch(unlikePost(post.id));
  };

  const handelDeletePost = () => {
    dispatch(deletePost(post.id));
  };

  return (
    post && (
      <Card elevation={2} className={classes.root}>
        <CardContent className="card-header-wrapper">
          <div className="card-header">
            <Avatar
              src={post.profilePhotoUrl}
              alt={post.username}
              className={classes.avatar}
            />
            <h2
              className="post-username"
              onClick={() => history.push(`/profile/${post.userId}`)}
            >
              {post.username}
            </h2>
            <p className="post-date">{moment(post.create_at).fromNow()}</p>
          </div>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={post.url}
          title="Paella dish"
        />
        <CardActions className="post-comment-container" disableSpacing>
          {liked ? (
            <IconButton onClick={unLikePost}>
              <FavoriteIcon style={{ fontSize: "40px" }} />
            </IconButton>
          ) : (
            <IconButton onClick={LikePost}>
              <FavoriteBorderIcon style={{ fontSize: "40px" }} />
            </IconButton>
          )}
          <h2>{post.likes.length}</h2>
          {post.userId === userInfo.user.id && (
            <div className="delete-post-button">
              <IconButton onClick={handelDeletePost}>
                <DeleteIcon style={{ fontSize: "35px" }} />
              </IconButton>
            </div>
          )}
        </CardActions>
        <div disableSpacing>
          <Comments postId={post.id} comments={post.comment} />
        </div>
      </Card>
    )
  );
};

export default Post;
