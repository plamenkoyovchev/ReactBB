import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Checkout</NavigationItem>
            <NavigationItem link="/">Order summary</NavigationItem>
        </ul>
    );
}

export default navigationItems;