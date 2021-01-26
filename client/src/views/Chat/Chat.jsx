import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Button from "@material-ui/core/Button";
import "./Chat.css";
import ChatSingleMessage from "../../components/ChatSingleMessage/ChatSingleMessage";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const ENDPOINT = "http://localhost:5000/";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { user } = userInfo;

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [onlineCounter, setOnlineCounter] = useState(0);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const userMessage = {
      username: user.username,
      userProfileImage: user.profilePhotoUrl,
      userId: user.id,
      message,
    };
    socket.emit("message", userMessage);
    setMessage("");
  };

  useEffect(() => {
    if (!socket?.connected) {
      socket = io.connect(ENDPOINT);
    }

    socket.on("usersCount", (usersCounter) => {
      console.log(usersCounter);
      setOnlineCounter(usersCounter);
    });

    socket.on("message", (userMessage) => {
      const userIdMatch = userMessage.userId === user.id;

      setChat([...chat, { ...userMessage, isCurrUserSend: userIdMatch }]);
    });

    socket.on("disconnect", () => {
      console.log("user DC");
    });
  }, [chat, user]);

  return (
    <div className="chat-wrapper">
      <Paper elevation={3} className="chat-container">
        <div className="chat-navbar">
          <div className="onlineCounter-wrapper">
            <PersonOutlineIcon />
            <span>{onlineCounter}</span>
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
  );
};

export default Chat;
