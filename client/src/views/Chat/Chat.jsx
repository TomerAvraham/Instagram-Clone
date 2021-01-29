import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Button from "@material-ui/core/Button";
import "./Chat.css";
import ChatSingleMessage from "../../components/ChatSingleMessage/ChatSingleMessage";
import { Prompt } from "react-router-dom";

import io from "socket.io-client";

const Chat = () => {
  const ENDPOINT = "https://ultragram-mysql.herokuapp.com/";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { user } = userInfo;

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [onlineCounter, setOnlineCounter] = useState(0);
  const [userTyping, setUserTyping] = useState("");

  const socket = useRef();

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    socket.current.emit("user typing", user.username);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const userMessage = {
      username: user.username,
      userProfileImage: user.profilePhotoUrl,
      userId: user.id,
      message,
    };
    socket.current.emit("message", userMessage);
    setMessage("");
  };

  const handleDisconnectFromChat = () => {
    socket.current.disconnect();
  };

  useEffect(() => {
    if (!socket.current?.connected) {
      socket.current = io.connect(ENDPOINT);
    }

    socket.current.on("usersCount", (usersCounter) => {
      setOnlineCounter(usersCounter);
    });

    socket.current.on("message", (userMessage) => {
      const userIdMatch = userMessage.userId === user.id;

      setChat([...chat, { ...userMessage, isCurrUserSend: userIdMatch }]);
    });

    socket.current.on("disconnect", () => {
      socket.current = false;
    });

    socket.current.on("show user typing", (username) => {
      setUserTyping(`${username} is typing..`);
      setTimeout(() => {
        setUserTyping("");
      }, 3000);
    });
  }, [chat, user]);

  return (
    <>
      {
        <Prompt
          when={socket.current}
          message={() => handleDisconnectFromChat()}
        />
      }
      <div className="chat-wrapper">
        <Paper elevation={3} className="chat-container">
          <div className="chat-navbar">
            <div className="onlineCounter-wrapper">
              <PersonOutlineIcon />
              <p>{onlineCounter}</p>
              <p>Online</p>
            </div>
            <div className="user-typing-wrapper">
              <p>{userTyping}</p>
            </div>
          </div>
          <div className="chat-messages-container">
            {chat.map((message, index) => (
              <ChatSingleMessage userMessage={message} key={index} />
            ))}
          </div>
          <form
            onSubmit={(e) => handleMessageSubmit(e)}
            className="chat-form-container"
          >
            <TextField
              id="message-input"
              placeholder="Type something.."
              type="text"
              value={message}
              onChange={(e) => handleInputChange(e)}
            />
            <Button
              disabled={!message}
              color="primary"
              variant="contained"
              type="submit"
            >
              SEND
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
};

export default Chat;
