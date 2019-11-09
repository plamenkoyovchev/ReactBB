import React, { useState } from 'react';

import { connect } from 'react-redux';

import Auxilary from '../../hoc/Auxilary';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

const layout = props => {
    const [showSidedrawer, setShowSidedrawer] = useState(false);

    const sidedrawerClosedHandler = () => {
        setShowSidedrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSidedrawer(!showSidedrawer);
    }

    return (
        <Auxilary>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isLoggedIn={props.isLoggedIn} />
            <Sidedrawer open={showSidedrawer} closed={sidedrawerClosedHandler} isLoggedIn={props.isLoggedIn} />
            <main className={classes.Content}>{props.children}</main>
        </Auxilary>
    );
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(layout);