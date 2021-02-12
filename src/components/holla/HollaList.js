import React, { useEffect, Fragment } from "react";
import Holla from "./Holla";
import HollaSkeleton from "../../util/HollaSkeleton";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getHollas, replaceImages } from "../../redux/actions/dataActions";

function HollaList({ classes, user, replaceImages, getHollas, data: { hollas, loading } }) {

  useEffect(() => {
    getHollas();
  }, []);

  useEffect(() => {
    if(user.credentials.imageUrl){
        replaceImages(user.credentials.imageUrl, user.credentials.handle);
    }
  }, [user.credentials.imageUrl])

  return (
    <Fragment>
      {!loading ? (
        hollas.map((holla) => <Holla holla={holla} key={holla.hollaId} />)
      ) : (
        <HollaSkeleton />
      )}
    </Fragment>
  );
}

HollaList.propTypes = {
  getHollas: PropTypes.func.isRequired,
  replaceImages: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user
});

export default connect(mapStateToProps, { getHollas, replaceImages })(HollaList);
