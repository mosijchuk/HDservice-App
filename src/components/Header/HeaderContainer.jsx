import React from "react";
import {connect} from "react-redux";
import Header from "./Header";
import {getCookie, logoutMe} from "../../redux/authReducer";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

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
        isLogged: state.auth.isLogged,
    };
};

export default compose(
    connect(mapStateToProps, {logoutMe}),

)
(HeaderContainer);
