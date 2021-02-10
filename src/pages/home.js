import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Holla from '../components/Holla'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

export const Home = (props) => {
  const [hollas, setHollas] = useState(null);

  useEffect(() => {
    axios
      .get("/hollas")
      .then((res) => {
        setHollas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
      <Grid item sm={8} xs={12}>
        {hollas ? (
          hollas.map((holla) => <Holla holla={holla} key={holla.hollaId} />)
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
    </Grid>
  );
};

// home.propTypes = {
//     props: PropTypes
// }

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(home)
export default Home;
