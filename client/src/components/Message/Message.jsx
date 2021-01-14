import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import "./Message.css";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const Message = ({ message, isCreate = false }) => {
  const [close, setClose] = useState(true);

  const handleClose = () => {
    setClose(!close);
  };

  return (
    <div className="message-container">
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={close}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity={isCreate ? "success" : "error"}>{message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Message;
