import React from "react";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import "./ChatSingleMessage.css";

const ChatSingleMessage = ({ userMessage }) => {
  const {
    username,
    userProfileImage,
    message,
    isCurrUserSend,
    userId,
  } = userMessage;

  return (
    <Box
      elevation={3}
      className={
        isCurrUserSend
          ? "chat-message-wrapper-current-user"
          : "chat-message-wrapper"
      }
    >
      <div className="chat-message-container">
        <div className="chat-message-avatar-wrapper">
          <Avatar
            className="chat-message-avatar"
            alt={username}
            src={userProfileImage}
            title={username}
          />
        </div>
        <p className="chat-message-content">
          <Link
            className={
              isCurrUserSend
                ? "chat-message-profile-link-current-user"
                : "chat-message-profile-link"
            }
            to={`/profile/${userId}`}
          >
            {username}:
          </Link>
          {message}
        </p>
      </div>
    </Box>
  );
};

export default ChatSingleMessage;
