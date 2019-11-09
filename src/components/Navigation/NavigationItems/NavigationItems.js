import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.isLoggedIn ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {!props.isLoggedIn
                ? <NavigationItem link="/auth">Sign Up</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    );
}

export default navigationItems;