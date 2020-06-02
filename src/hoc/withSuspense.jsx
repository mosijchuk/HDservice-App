import React from "react";
import Preloader from "../components/common/Preloader/Preloader";

let mapStateToPropsRedirect = state => {
  return {
    isLogged: state.auth.isLogged
  };
};

export const withSuspense = Component => {
  return props => {
    return (
      <React.Suspense fallback={<Preloader />}>
        <Component {...props} />
      </React.Suspense>
    );
  };
};
