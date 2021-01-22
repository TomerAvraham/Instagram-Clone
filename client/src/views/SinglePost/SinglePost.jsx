import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSinglePost } from "../../redux/actions/postActions";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import "./SinglePost.css";

const SinglePost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const userSinglePost = useSelector((state) => state.userSinglePost);
  const { post, loading } = userSinglePost;

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [postId, dispatch]);

  return (
    <>
      {loading && <Loader />}
      <div className="single-post-container">
        {post && <Post post={post} />}
      </div>
    </>
  );
};

export default SinglePost;
