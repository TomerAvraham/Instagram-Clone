import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { useSelector, useDispatch } from "react-redux";
import { addPost, uploadImage } from "../../redux/actions/addPostActions";
import { CLEAR_ADD_POST_REDUCER } from "../../redux/types/addPostTypes";
import "./AddPost.css";

const AddPost = () => {
  const [file, setFile] = useState({});

  const dispatch = useDispatch();

  const userAddPost = useSelector((state) => state.userAddPost);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, loadingFile, error, filePath, success } = userAddPost;

  const handelUploadButton = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);

    dispatch(uploadImage(data, "/toPostImages"));
  };

  const handelFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handelAddPostButton = () => {
    const currUserId = userLogin.userInfo.user.id;
    dispatch(addPost(currUserId, filePath));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: CLEAR_ADD_POST_REDUCER });
    }
  }, []);

  return (
    <>
      {error || success ? (
        <Message
          message={error ? error : success}
          isGreen={success && success}
        />
      ) : null}

      <div className="add__post__container">
        {loading && <Loader />}

        <form
          onSubmit={(e) => handelUploadButton(e)}
          className="add__post__form"
        >
          <TextField
            onChange={(e) => handelFileChange(e)}
            id="fileInput"
            type="file"
          />
          <Button
            disabled={
              Object.keys(file).length === 0 && file.constructor === Object
            }
            color="primary"
            variant="contained"
            type="submit"
          >
            Upload
          </Button>
        </form>
        <div className="upload__image__container">
          {loadingFile ? (
            <CircularProgress />
          ) : (
            filePath && <img src={filePath} alt="pic" />
          )}
        </div>
        <Button
          onClick={handelAddPostButton}
          variant="contained"
          color="primary"
          disabled={!filePath}
          className="post__btn"
        >
          Post
        </Button>
      </div>
    </>
  );
};

export default AddPost;
