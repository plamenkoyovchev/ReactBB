import React, { Component } from 'react';

import { connect } from 'react-redux';

import Auxilary from '../../hoc/Auxilary';
import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidedrawer: false
        };
    }

    sidedrawerClosedHandler = () => {
        this.setState({ showSidedrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSidedrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <Auxilary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isLoggedIn={this.props.isLoggedIn} />
                <Sidedrawer open={this.state.showSidedrawer} closed={this.sidedrawerClosedHandler} />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxilary>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);