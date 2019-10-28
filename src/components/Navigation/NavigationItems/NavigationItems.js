import React from 'react';

import { Redirect } from 'react-router-dom';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {!props.isLoggedIn
                ? <NavigationItem link="/auth">Sign Up</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    );
}

export default navigationItems;