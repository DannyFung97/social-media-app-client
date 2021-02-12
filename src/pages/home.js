import React from "react";
import Grid from "@material-ui/core/Grid";

import Profile from '../components/profile/Profile'
import HollaList from '../components/holla/HollaList';

export const Home = () => {

  return (
    <Grid container spacing={3}>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={8} xs={12} style={{overflowY: 'auto', height: '80vh'}}>
        <HollaList />
      </Grid>
    </Grid>
  );
};

export default Home;
