import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  followProfile,
  getProfileDetails,
  unFollowProfile,
} from "../../redux/actions/profileActions";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ProfilePost from "../../components/ProfilePost/ProfilePost";
import "./Profile.css";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: "3rem",
  },
}));

function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleFollow = () => {
    dispatch(followProfile(userId));
  };

  const handelUnFollow = () => {
    dispatch(unFollowProfile(userId));
  };

  const userProfile = useSelector((state) => state.userProfile);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, profileDetails, posts } = userProfile;

  useEffect(() => {
    dispatch(getProfileDetails(userId));
  }, [dispatch, userId]);

  const renderButtons = (profileImageUrl) => {
    if (userLogin.userInfo.user.id === Number(userId)) {
      return (
        <>
          <Button
            onClick={handleModalOpen}
            variant="contained"
            id="editProfileButton"
          >
            Edit Profile
          </Button>
          <EditProfileModal
            handleModalClose={handleModalClose}
            openModal={openModal}
            profileImageUrl={profileImageUrl}
          />
        </>
      );
    } else if (profileDetails?.isCurrUserFollow) {
      return (
        <Button onClick={handelUnFollow} color="primary" variant="contained">
          unFollow
        </Button>
      );
    } else if (!profileDetails?.isCurrUserFollow) {
      return (
        <Button onClick={handleFollow} color="primary" variant="contained">
          Follow
        </Button>
      );
    }
  };

  const classes = useStyles();

  return (
    <Container maxWidth="sm">
      <div className="profile-wrapper">
        <header>
          <div className="avatar-wrapper">
            <Avatar
              alt={profileDetails?.username}
              src={profileDetails?.profilePhotoUrl}
              className={classes.large}
            />
          </div>
          <div className="user-details">
            <div className="username-button">
              <h2>{profileDetails?.username}</h2>
              {renderButtons(profileDetails?.profilePhotoUrl)}
            </div>
            <div className="email">{profileDetails?.email}</div>
            <div className="amount">
              <ul>
                <li>{posts?.length} posts</li>
                <li className="middle-amount">
                  {profileDetails?.followers} followers
                </li>
                <li>{profileDetails?.following} following</li>
              </ul>
            </div>
          </div>
        </header>
        <main>
          <Grid container spacing={3}>
            {posts &&
              posts.map((post, index) => (
                <ProfilePost post={post} key={index} />
              ))}
          </Grid>
        </main>
      </div>
    </Container>
  );
}

export default Profile;
