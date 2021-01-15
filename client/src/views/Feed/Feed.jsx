import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/actions/postActions";
import Loader from "../../components/Loader/Loader";
import Container from "@material-ui/core/Container";
import Post from "../../components/Post/Post";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();

  const userPosts = useSelector((state) => state.userPosts);
  const { posts, loading, error } = userPosts;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="feed-wrapper">
      {loading && <Loader />}
      <Container maxWidth="sm">
        {posts && posts.map((post, i) => <Post post={post} key={i} />)}
      </Container>
    </div>
  );
};

export default Feed;
