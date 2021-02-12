import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import PersonalButton from "../../util/PersonalButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { connect } from "react-redux";
import { getHolla, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.common,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '80%'
  },
  expandButton: {
    // position: 'absolute',
    // left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

function HollaDialog({
  classes,
  openDialog,
  UI: { loading },
  holla : {
    hollaId : _hollaId,
    body,
    createdAt,
    likeCount,
    commentCount,
    userImage,
    userHandle : _userHandle,
    comments
  },
  getHolla,
  clearErrors,
  userHandle,
  hollaId
}) {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");
  const [newPath, setNewPath] = useState("");

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const _newPath = `/users/${userHandle}/holla/${hollaId}`;

    if (oldPath === _newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, _newPath);

    setOpen(true);
    setOldPath(oldPath);
    setNewPath(_newPath);
    getHolla(hollaId);
  };

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
    clearErrors();
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={4}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          {userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton hollaId={hollaId} />
        <span>{likeCount} likes</span>
        <PersonalButton tip="Comments">
          <ChatIcon color="primary" />
        </PersonalButton>
        <span>{comments?.length} comments</span>
      </Grid>
      {/* <hr className={classes.visibleSeparator} /> */}
      <CommentForm hollaId={hollaId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <PersonalButton
        onClick={handleOpen}
        tip="Comments"
        tipClassName={classes.expandButton}
      >
        <ChatIcon color="primary" />
      </PersonalButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <PersonalButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </PersonalButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

HollaDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getHolla: PropTypes.func.isRequired,
  hollaId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  holla: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  holla: state.data.holla,
  UI: state.UI,
});

const mapActionsToProps = {
  getHolla,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(HollaDialog));
