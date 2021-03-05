import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Fab } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import InstagramIcon from "@material-ui/icons/Instagram";
import Avatar from "@material-ui/core/Avatar";
import ExploreIcon from "@material-ui/icons/Explore";
import { Link, useHistory } from "react-router-dom";
import { KeyboardArrowUp } from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { logout } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import HideOnScroll from "./HideOnScroll";
import BackToTop from "./BackToTop";
import MenuItems from "./MenuItems";
import NavbarSearch from "./NavbarSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbarWrapper: {
    background: "#f1f2f6",
    color: "#2d3436",
    padding: "0 3%",
  },
  toolFlex: {
    display: "flex",
    with: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexChild: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    maxWidth: "400px",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    border: "1px solid #2d3436",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  links: {
    width: "auto",
    display: "flex",
  },
  icon: {
    margin: theme.spacing(1),
  },
  avatar: {
    flexGrow: 1,
  },
}));

const Navbar = ({ userInfo }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handelProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handelProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handelMyProfileClick = () => {
    history.push(`/profile/${userInfo.user.id}`);
    handelProfileMenuClose();
  };

  const history = useHistory();

  const [menuButton, setMenuButton] = useState(false);

  const showMenuButton = () => {
    if (window.innerWidth <= 950) {
      setMenuButton(false);
    } else {
      setMenuButton(true);
    }
  };

  window.addEventListener("resize", showMenuButton);

  const userProfile = useSelector((state) => state.userProfile);
  const { profileDetails } = userProfile;

  useEffect(() => {
    showMenuButton();
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar className={classes.navbarWrapper} position="static">
          <Toolbar className={classes.toolFlex}>
            <div className={classes.flexChild}>
              <InstagramIcon className={classes.logo} fontSize="large" />
              <Typography className={classes.title} variant="h6" noWrap>
                <code style={{ fontSize: "150%" }}>UltraGram</code>
              </Typography>
            </div>

            {menuButton ? (
              <>
                <div className={classes.flexChild}>
                  <NavbarSearch width={240} />
                </div>
                <div className={classes.flexChild}>
                  <div className={classes.links}>
                    <div className={classes.icon}>
                      <Link to="/">
                        <IconButton>
                          <ExploreIcon fontSize="large" />
                        </IconButton>
                      </Link>
                    </div>
                    <div className={classes.icon}>
                      <Link to="/chat">
                        <IconButton>
                          <ChatIcon fontSize="large" />
                        </IconButton>
                      </Link>
                    </div>
                    <div className={classes.icon}>
                      <Link to="/likes">
                        <IconButton>
                          <FavoriteIcon fontSize="large" />
                        </IconButton>
                      </Link>
                      <Link to="/addPost">
                        <IconButton>
                          <AddCircleIcon fontSize="large" />
                        </IconButton>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className={classes.flexChild}>
                  <div className={classes.avatar}>
                    <IconButton onClick={handelProfileMenu}>
                      <Avatar
                        alt={userInfo.user.username}
                        src={
                          profileDetails?.profilePhotoUrl ||
                          userInfo.user.profilePhotoUrl
                        }
                      />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      vent
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={handelProfileMenuClose}
                    >
                      <MenuItem onClick={handelMyProfileClick}>
                        My Profile
                      </MenuItem>
                      <MenuItem onClick={() => dispatch(logout())}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </>
            ) : (
              <>
                <MenuItems userInfo={userInfo} />
              </>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar
        id="back-to-top-anchor"
        style={{ maxHeight: "1px", position: "absolute" }}
      />
      <BackToTop>
        <Fab size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </div>
  );
};

export default Navbar;
