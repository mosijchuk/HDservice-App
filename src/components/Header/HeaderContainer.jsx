import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { logoutMe } from "../../redux/authReducer";

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authFalse: false
    };
  }
  componentDidMount() {
    this.setState({
      authFalse: !this.props.isLogged
    });
  }

  render() {
    return (
      <div>
        <Header {...this.props} />
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    isLogged: state.auth.isLogged
  };
};

export default connect(mapStateToProps, { logoutMe })(HeaderContainer);
