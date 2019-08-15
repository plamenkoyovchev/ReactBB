import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
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
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <Sidedrawer open={this.state.showSidedrawer} closed={this.sidedrawerClosedHandler} />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

export default Layout;