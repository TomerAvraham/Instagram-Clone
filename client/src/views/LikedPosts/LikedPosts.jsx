import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllLikedPosts } from "../../redux/actions/postActions";
import Loader from "../../components/Loader/Loader";
import Container from "@material-ui/core/Container";
import Post from "../../components/Post/Post";
import Message from "../../components/Message/Message";

const LikedPosts = () => {
  const dispatch = useDispatch();

  const userLikePosts = useSelector((state) => state.userLikePosts);
  const { posts, loading, error } = userLikePosts;

  useEffect(() => {
    dispatch(getAllLikedPosts());
  }, [dispatch]);

  return (
    <>
      {error && <Message message={"Something went wrong"} />}
      <div className="feed-wrapper">
        {loading && <Loader />}
        <Container maxWidth="sm">
          {posts && posts.map((post, i) => <Post post={post} key={i} />)}
        </Container>
      </div>
    </>
  );
};

export default LikedPosts;
