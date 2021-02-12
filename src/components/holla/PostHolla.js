import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import PersonalButton from "../../util/PersonalButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
// Redux stuff
import { connect } from "react-redux";
import { postHolla, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.common,
  submitButton: {
    position: 'relative',
    float: 'right',
    margin: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
});

function PostHolla({ classes, UI, clearErrors, postHolla }) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (UI.errors) {
      setErrors(UI.errors);
    }
    if (!UI.errors && !UI.loading) {
      setBody("");
      setOpen(false);
      setErrors({});
    }
  }, [UI]);

  const handleClose = () => {
    clearErrors();
    setOpen(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postHolla({ body: body });
  };

  return (
    <Fragment>
      <PersonalButton onClick={() => setOpen(true)} tip="Post a Holla!" btnClassName="button">
        <AddIcon />
      </PersonalButton>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Post a new holla</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="HOLLA!"
              multiline
              rows="3"
              placeholder="Holler out a hot topic"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={e => setBody(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleClose()}
                className={classes.submitButton}
                >
                Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

PostHolla.propTypes = {
  postHolla: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postHolla, clearErrors })(
  withStyles(styles)(PostHolla)
);
