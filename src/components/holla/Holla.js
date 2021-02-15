import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import PersonalButton from "../../util/PersonalButton";
import DeleteHolla from "./DeleteHolla";
import LikeButton from "./LikeButton";
import HollaDialog from "./HollaDialog";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 'min(200px, 35vw)',
    // minWidth: 200,
    backgroundSize: "cover",
  },
  content: {
    padding: 30,
    objectFit: "cover",
  },
};

function Holla({
  classes,
  holla: {
    body,
    createdAt,
    userImage,
    userHandle,
    hollaId,
    likeCount,
    commentCount,
  },
  openDialog,
  user: {
    authenticated,
    credentials: { handle },
  },
}) {
  dayjs.extend(relativeTime);
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton hollaId={hollaId} />
        <span>{likeCount}</span>
        <HollaDialog
          hollaId={hollaId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
        <span>{commentCount}</span>
        {authenticated && userHandle === handle ? (
          <DeleteHolla hollaId={hollaId} />
        ) : null}
      </CardContent>
    </Card>
  );
}

Holla.propTypes = {
  user: PropTypes.object.isRequired,
  holla: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Holla));
