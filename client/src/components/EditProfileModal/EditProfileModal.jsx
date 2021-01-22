import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/actions/addPostActions";
import { editProfileDetails } from "../../redux/actions/profileActions";
import Message from "../Message/Message";
import "./EditProfileModal.css";

const EditProfileModal = ({ openModal, handleModalClose, profileImageUrl }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [usernameAlreadyExist, setUsernameAlreadyExist] = useState(false);
  const [modalProfileImage, setModalProfileImage] = useState(profileImageUrl);
  const [lastChange, setLastChange] = useState("");

  const allProfile = useSelector((state) => state.allProfiles);
  const userProfile = useSelector((state) => state.userProfile);
  const { profiles } = allProfile;
  const { newProfileImagePath } = userProfile;

  const handelFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handelCloseAndResatModal = () => {
    setNewUsername("");
    setFile({});
    handleModalClose();
  };

  const handelUsernameChange = (e) => {
    setNewUsername(e.target.value);
    const existUsername = profiles.find(
      (profile) => profile.username === e.target.value
    );
    if (existUsername) {
      setUsernameAlreadyExist(true);
    } else {
      setUsernameAlreadyExist(false);
    }
    if (e.target.value === lastChange) {
      setUsernameAlreadyExist(true);
    }
  };

  const handelFileUpload = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);

    dispatch(uploadImage(data, "/toProfileImages"));
  };

  const handelEditProfile = () => {
    dispatch(editProfileDetails(newUsername, newProfileImagePath));
    setLastChange(newUsername);
    handelCloseAndResatModal();
  };

  useEffect(() => {
    setModalProfileImage(newProfileImagePath);
  }, [file, newProfileImagePath]);

  return (
    <Modal
      open={openModal}
      onClose={handelCloseAndResatModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <form onSubmit={(e) => handelFileUpload(e)} className="modal-container">
        <div className="modal-image-container">
          <img src={modalProfileImage} alt="profile pic" />
        </div>
        <div className="modal-inner-form">
          <TextField
            type="file"
            placeholder="Pick new profile"
            onChange={(e) => handelFileChange(e)}
          />
          <Button
            disabled={
              Object.keys(file).length === 0 && file.constructor === Object
            }
            color="primary"
            variant="contained"
            type="submit"
          >
            UPLOAD
          </Button>
          <TextField
            onChange={(e) => handelUsernameChange(e)}
            type="text"
            value={newUsername}
            label="New username"
          />
          {usernameAlreadyExist && newUsername && (
            <Message message={"username's already taken"} />
          )}
          <Button
            color="primary"
            disabled={
              usernameAlreadyExist || (!newUsername && !newProfileImagePath)
            }
            variant="contained"
            onClick={handelEditProfile}
          >
            CONFIRM
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
