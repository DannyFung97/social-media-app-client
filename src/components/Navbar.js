import React from "react";
import { Link } from "react-router-dom";

import hotTops from '../assets/hot-tops.png';

import { AppBar, Toolbar, Button} from '@material-ui/core'
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";

function Navbar() {
  return (
    <AppBar color='primary'>
      <Toolbar className="nav-container">
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
