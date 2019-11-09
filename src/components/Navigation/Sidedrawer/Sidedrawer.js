import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Sidedrawer.css';

import Auxilary from '../../../hoc/Auxilary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidedrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxilary>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isLoggedIn={props.isLoggedIn} />
                </nav>
            </div>
        </Auxilary>
    );
};

export default sidedrawer;