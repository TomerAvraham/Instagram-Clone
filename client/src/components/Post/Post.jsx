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
import { useSelector, useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/postActions";

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
    dispatch(likePost(post.id));
  };

  const unLikePost = () => {
    setLiked(!liked);
    dispatch(unlikePost(post.id));
  };

  return (
    <Card elevation={2} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={post.profilePhotoUrl}
            alt={post.username}
            className={classes.avatar}
          />
        }
        title={post.username}
        subheader={post.create_at}
      />
      <CardMedia
        className={classes.media}
        image={post.url}
        title="Paella dish"
      />
      <CardActions disableSpacing>
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
