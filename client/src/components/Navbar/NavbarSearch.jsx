import React, { useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { getAllProfiles } from "../../redux/actions/profileActions";

const NavbarSearch = ({ width, toggleDrawer = false }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const allProfiles = useSelector((state) => state.allProfiles);
  const { loading, profiles } = allProfiles;

  const handleProfileSelectFromSearch = (id) => {
    history.push(`/profile/${id}`);
    toggleDrawer && toggleDrawer();
  };

  useEffect(() => {
    dispatch(getAllProfiles());
  }, [dispatch]);

  return (
    <div>
      <Autocomplete
        options={profiles}
        loading={loading}
        onChange={(event, value) =>
          value && handleProfileSelectFromSearch(value.id)
        }
        getOptionLabel={(option) => option.username}
        renderOption={(option) => (
          <>
            <div style={{ marginRight: "15px" }}>
              {<Avatar src={option.profilePhotoUrl} alt={option.username} />}
            </div>
            <p>{option.username}</p>
          </>
        )}
        style={{ width: width }}
        renderInput={(params) => (
          <TextField {...params} label="Search Profile" />
        )}
      />
    </div>
  );
};

export default NavbarSearch;
