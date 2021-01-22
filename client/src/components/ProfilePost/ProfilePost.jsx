import React from "react";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useHistory } from "react-router-dom";
import "./ProfilePost.css";

const ProfilePost = ({ post }) => {
  const history = useHistory();

  return (
    post && (
      <Grid className="profile-post-grid-item" item xs={4}>
        <div
          className="profile-post-wrapper"
          onClick={() => history.push(`/post/${post.id}`)}
        >
          <div className="image-overlay">
            <div className="profile-post-overlay-icons">
              <div className="profile-post-overlay-icon-wrapper">
                <h2>{post.numberOfLikes}</h2>
                <FavoriteIcon style={{ fontSize: "40px" }} />
              </div>
              <div className="profile-post-overlay-icon-wrapper">
                <h2>{post.numberOfComments}</h2>
                <ChatBubbleIcon style={{ fontSize: "40px" }} />
              </div>
            </div>
          </div>
          <img src={post.url} alt="" />
        </div>
      </Grid>
    )
  );
};

export default ProfilePost;
