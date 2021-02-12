import React from 'react';
import PersonalButton from '../../util/PersonalButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeHolla, unlikeHolla } from '../../redux/actions/dataActions';

function LikeButton({ user, hollaId, likeHolla, unlikeHolla }) {
    const likedHolla = () => {
        if(user.likes && user.likes.find(like => like.hollaId === hollaId)){
            return true;
        }
        return false;
    };

    const likeButton = !user.authenticated ? (
        <Link to="/login">
          <PersonalButton tip="Like">
            <FavoriteBorder color="primary" />
          </PersonalButton>
        </Link>
      ) : likedHolla() ? (
        <PersonalButton tip="Undo like" onClick={() => unlikeHolla(hollaId)}>
          <FavoriteIcon color="primary" />
        </PersonalButton>
      ) : (
        <PersonalButton tip="Like" onClick={() => likeHolla(hollaId)}>
          <FavoriteBorder color="primary" />
        </PersonalButton>
      );
      return likeButton;
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    hollaId: PropTypes.string.isRequired,
    likeHolla: PropTypes.func.isRequired,
    unlikeHolla: PropTypes.func.isRequired
  };
  
  const mapStateToProps = (state) => ({
    user: state.user
  });
  
  const mapActionsToProps = {
    likeHolla,
    unlikeHolla
  };
  
  export default connect(
    mapStateToProps,
    mapActionsToProps
  )(LikeButton);
