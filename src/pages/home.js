import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Holla from '../components/holla/Holla'
import Profile from '../components/profile/Profile'
import HollaSkeleton from "../util/HollaSkeleton";

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getHollas } from '../redux/actions/dataActions';

export const Home = ({ getHollas, data: { hollas, loading } }) => {

  useEffect(() => {
    getHollas();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12}>
        {!loading ? (
          hollas.map((holla) => <Holla holla={holla} key={holla.hollaId} />)
        ) : (
          <HollaSkeleton />
        )}
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getHollas: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

// export default connect(mapStateToProps, mapDispatchToProps)(home)
export default connect(mapStateToProps, { getHollas })(Home);
