import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.common
});

function CommentForm({ submitComment, UI, classes, hollaId, authenticated }) {
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(UI.errors) {
            setErrors(UI.errors);
        }
        if(!UI.errors && !UI.loading) {
            setBody('');
        }
    }, [UI])

    const handleSubmit = e => {
        e.preventDefault();
        submitComment(hollaId, { body: body });
    }

    const commentFormMarkup = authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Comment on holla"
              error={errors.comment ? true : false}
              helperText={errors.comment}
              value={body}
              onChange={e => setBody(e.target.value)}
              fullWidth
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
          {/* <hr className={classes.visibleSeparator} /> */}
        </Grid>
      ) : null;

    return commentFormMarkup;
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    hollaId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
  });
  
  export default connect(
    mapStateToProps,
    { submitComment }
  )(withStyles(styles)(CommentForm));
