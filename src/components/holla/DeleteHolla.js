import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import PersonalButton from "../../util/PersonalButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteHolla } from "../../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};

function DeleteHolla({ classes, hollaId, deleteHolla }) {
  const [open, setOpen] = useState(false);

  const deleteHollaAndClose = () => {
    deleteHolla(hollaId);
    setOpen(false);
  };

  return (
    <Fragment>
      <PersonalButton
        tip="Delete Holla"
        onClick={() => setOpen(true)}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </PersonalButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete this holla ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => deleteHollaAndClose()} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

DeleteHolla.propTypes = {
  deleteHolla: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  hollaId: PropTypes.string.isRequired,
};

export default connect(null, { deleteHolla })(withStyles(styles)(DeleteHolla));
