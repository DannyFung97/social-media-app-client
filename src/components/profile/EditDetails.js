import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import PersonalButton from "../../util/PersonalButton";
// Redux stuff
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

// Icons
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
  ...theme.common,
  button: {
    // left: "80%",
  },
});

function EditDetails({ classes, credentials, editUserDetails }) {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location,
    };
    editUserDetails(userDetails);
    handleClose();
  };

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  return (
    <Fragment>
      <PersonalButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </PersonalButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows={3}
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal or professional website"
              className={classes.textField}
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you are at"
              className={classes.textField}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
