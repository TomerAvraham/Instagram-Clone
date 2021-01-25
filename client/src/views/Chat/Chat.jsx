import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
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

    socket.on("connect", () => {
      console.log(socket);
    });

    socket.on("message", (userMessage) => {
      setChat([
        ...chat,
        { ...userMessage, isCurrUserSend: userMessage.userId === user.id },
      ]);
    });

    socket.on("disconnect", () => {
      console.log("user Dc");
    });
  }, [chat, user]);

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <h1>im chat</h1>
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
            placeholder="Type message.."
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
      </div>
    </div>
  );
};

export default Chat;
