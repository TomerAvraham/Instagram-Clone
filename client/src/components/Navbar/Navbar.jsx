import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import InstagramIcon from "@material-ui/icons/Instagram";
import Avatar from "@material-ui/core/Avatar";
import ExploreIcon from "@material-ui/icons/Explore";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "red",
  },
  navbarWrapper: {
    background: "#ffffff",
    color: "#2d3436",
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
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
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar elevation={1} className={classes.navbarWrapper} position="static">
        <Toolbar className={classes.toolFlex}>
          <div className={classes.flexChild}>
            <InstagramIcon className={classes.logo} fontSize="large" />
            <Typography className={classes.title} variant="h6" noWrap>
              UltraGram
            </Typography>
          </div>
          <div className={classes.flexChild}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          <div className={classes.flexChild}>
            <div className={classes.links}>
              <div className={classes.icon}>
                <NavLink to="/">
                  <IconButton>
                    <ExploreIcon fontSize="large" />
                  </IconButton>
                </NavLink>
              </div>
              <div className={classes.icon}>
                <NavLink to="/chat">
                  <IconButton>
                    <ChatIcon fontSize="large" />
                  </IconButton>
                </NavLink>
              </div>
              <div className={classes.icon}>
                <NavLink to="/likes">
                  <IconButton>
                    <FavoriteIcon fontSize="large" />
                  </IconButton>
                </NavLink>
              </div>
            </div>
          </div>
          <div className={classes.flexChild}>
            <div className={classes.avatar}>
              <IconButton>
                <Avatar
                  alt={userInfo.user.username}
                  src={userInfo.user.profilePhotoUrl}
                />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
