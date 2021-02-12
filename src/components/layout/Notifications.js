import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

function Notifications({ notifications, markNotificationsRead }) {
  const [anchorElement, setAnchorElement] = useState(null);

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((note) => !note.read)
      .map((note) => note.notificationId);
    markNotificationsRead(unreadNotificationsIds);
  };

  dayjs.extend(relativeTime);

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((note) => note.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((note) => note.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((note) => {
        const verb = note.type === "like" ? "liked" : "commented on";
        const time = dayjs(note.createdAt).fromNow();
        const iconColor = note.read ? "primary" : "secondary";
        const icon =
          note.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={note.createdAt} onClick={e => setAnchorElement(null)}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${note.recipient}/holla/${note.hollaId}`}
            >
              {note.sender} {verb} your holla {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={e => setAnchorElement(null)}>
        You have no notifications yet
      </MenuItem>
    );

  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorElement ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={e => setAnchorElement(e.target)}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        open={Boolean(anchorElement)}
        onClose={e => setAnchorElement(null)}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
