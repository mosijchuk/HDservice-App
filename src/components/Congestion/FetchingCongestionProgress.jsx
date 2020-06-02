import React, { useEffect } from "react";
import { connect } from "react-redux";
import Preloader from "../common/Preloader/Preloader";

const FetchingCongestionProgress = ({ isFetching }) => {
  return isFetching && <Preloader small={true} size={24} />;
};

const mapStateToProps = state => ({
  isFetching: state.congestion.isFetchingCongestion
});

export default connect(mapStateToProps, {})(FetchingCongestionProgress);
