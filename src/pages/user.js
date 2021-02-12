import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Holla from "../components/holla/Holla";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import HollaSkeleton from "../util/HollaSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserPage } from "../redux/actions/dataActions";

function User({ match, getUserPage, data: { hollas, loading } }) {
  const [profile, setProfile] = useState(null);
  const [hollaIdParam, setHollaIdParam] = useState(null);

  useEffect(() => {
    const handle = match.params.handle;
    const hollaId = match.params.hollaId;

    if (hollaId) setHollaIdParam(hollaId);

    getUserPage(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (match.params.handle) {
      getUserPage(match.params.handle);
      axios
        .get(`/user/${match.params.handle}`)
        .then((res) => {
          setProfile(res.data.user);
        })
        .catch((err) => console.log(err));
    }
  }, [match.params.handle]);

  const hollasMarkup = loading ? (
    <HollaSkeleton />
  ) : hollas === null ? (
    <p>No hollas from this user</p>
  ) : !hollaIdParam ? (
    hollas.map((holla) => <Holla key={holla.hollaId} holla={holla} />)
  ) : (
    hollas.map((holla) => {
      if (holla.hollaId !== hollaIdParam)
        return <Holla key={holla.hollaId} holla={holla} />;
      else return <Holla key={holla.hollaId} holla={holla} openDialog />;
    })
  );

  return (
    <Grid container spacing={4}>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
      <Grid item sm={8} xs={12} style={{overflowY: 'auto', height: '75vh'}}>
        {hollasMarkup}
      </Grid>
    </Grid>
  );
}

User.propTypes = {
  getUserPage: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserPage })(User);
