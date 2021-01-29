import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import NavbarSearch from "./NavbarSearch";
import { useHistory } from "react-router-dom";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: "100vw",
  },
  closeIcon: {
    marginLeft: "auto",
    marginRight: "25px",
  },
  listItem: {
    height: "50px",
    margin: "0 auto",
    textDecoration: "none",
    color: "#2f3640",
    fontSize: "2rem",
  },
  withIcon: {
    margin: "0 auto",
    height: "50px",
    textDecoration: "none",
    color: "#2f3640",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listItemContent: {
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const MenuItems = ({ userInfo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handelLogout = () => {
    dispatch(logout());
  };

  const handleProfileClick = () => {
    history.push(`/profile/${userInfo.user.id}`);
    toggleDrawer();
  };

  const drawer = (
    <div className={classes.drawer}>
      <List>
        <ListItem>
          <IconButton className={classes.closeIcon} onClick={toggleDrawer}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem className={classes.listItemContent} button>
          <NavbarSearch toggleDrawer={toggleDrawer} width={"70vw"} />
        </ListItem>
        <Link className={classes.listItem} to="/">
          <ListItem
            className={classes.listItemContent}
            button
            onClick={toggleDrawer}
          >
            <ListItemText primary={"Explorer"} />
          </ListItem>
        </Link>
        <Link className={classes.listItem} to="/chat">
          <ListItem
            className={classes.listItemContent}
            button
            onClick={toggleDrawer}
          >
            <ListItemText primary={"Chat"} />
          </ListItem>
        </Link>
        <Link className={classes.listItem} to="/likes">
          <ListItem
            className={classes.listItemContent}
            button
            onClick={toggleDrawer}
          >
            <ListItemText primary={"Favorite"} />
          </ListItem>
        </Link>
        <Link className={classes.listItem} to="/addPost">
          <ListItem
            className={classes.listItemContent}
            button
            onClick={toggleDrawer}
          >
            <ListItemText primary={"Add Post"} />
          </ListItem>
        </Link>
        <ListItem
          className={classes.listItemContent}
          button
          onClick={handleProfileClick}
        >
          <div className={classes.withIcon}>
            <ListItemIcon>
              {
                <Avatar
                  className={classes.drawerAvatar}
                  src={userInfo.user.profilePhotoUrl}
                  alt={userInfo.user.username}
                />
              }
            </ListItemIcon>
            <ListItemText primary={userInfo.user.username} />
          </div>
        </ListItem>
        <Divider />
        <ListItem onClick={handelLogout} button>
          <div className={classes.withIcon}>
            <ListItemIcon>{<ExitToAppIcon />}</ListItemIcon>
            <ListItemText primary={"Logout"} />
          </div>
        </ListItem>
        <Divider />
      </List>
    </div>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </div>
  );
};

export default MenuItems;
