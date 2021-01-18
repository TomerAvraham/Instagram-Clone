import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Comments from "../Comments/Comments";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/postActions";
import "./Post.css";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "30px 0",
    maxWidth: 500,
    minHeight: 550,
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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let isCurrUserLike = post.likes.some((e) => e.userId === userInfo.user.id);

  const [liked, setLiked] = useState(isCurrUserLike);

  const LikePost = () => {
    setLiked(!liked);
    if (`${document.location.href}`.split("/").pop() === "") {
      dispatch(likePost(post.id));
    } else {
      dispatch(likePost(post.id, true));
    }
  };

  const unLikePost = () => {
    setLiked(!liked);
    if (`${document.location.href}`.split("/").pop() === "") {
      dispatch(unlikePost(post.id));
    } else {
      dispatch(unlikePost(post.id, true));
    }
  };

  return (
    <Card elevation={2} className={classes.root}>
      <CardContent className="card-header-wrapper">
        <div className="card-header">
          <Avatar
            src={post.profilePhotoUrl}
            alt={post.username}
            className={classes.avatar}
          />
          <h2>{post.username}</h2>
          <p className="post-date" >{moment(post.create_at).fromNow()}</p>
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
            <FavoriteIcon style={{ fontSize: "45px" }} />
          </IconButton>
        ) : (
          <IconButton onClick={LikePost}>
            <FavoriteBorderIcon style={{ fontSize: "45px" }} />
          </IconButton>
        )}
        <h2>{post.likes.length}</h2>
      </CardActions>
      <div disableSpacing>
        <Comments postId={post.id} comments={post.comment} />
      </div>
    </Card>
  );
};

export default Post;
