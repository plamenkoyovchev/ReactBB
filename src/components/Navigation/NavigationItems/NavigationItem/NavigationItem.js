import React from 'react';

import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                to={props.link}
                activeClassName={props.active ? classes.active : null}>
                {props.children}
            </NavLink>
        </li>
    );
};

export default navigationItem;