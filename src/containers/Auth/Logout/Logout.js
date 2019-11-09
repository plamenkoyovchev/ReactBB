import * as actions from '../../../store/actions/index';

import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const logout = props => {
    const { logout } = props;

    useEffect(() => {
        logout();
    }, [logout]);

    return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout())
    };
};

export default connect(null, mapDispatchToProps)(logout);
