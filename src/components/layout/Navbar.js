import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PersonalButton from "../../util/PersonalButton";
import PostHolla from "../holla/PostHolla";

import hotTops from "../../assets/hot-tops.png";

import { AppBar, Toolbar, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import Notifications from "./Notifications";

import { logoutUser } from "../../redux/actions/userActions";

function Navbar({ user, logoutUser }) {

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <AppBar color="primary">
      <Toolbar className="nav-container">
        {user.authenticated ? (
          <Fragment>
            <PostHolla />
            <Link to={`/users/${user.credentials.handle}`}>
              <PersonalButton tip="Profile">
                <PersonIcon />
              </PersonalButton>
            </Link>
            <Link to="/">
              <PersonalButton tip="Home">
                <HomeIcon />
              </PersonalButton>
            </Link>
            <Notifications />
            <PersonalButton tip="Logout" onClick={handleLogout}>
              <ExitToAppIcon color="primary" />
            </PersonalButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
