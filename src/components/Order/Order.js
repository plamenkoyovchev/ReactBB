import React from 'react';
import classes from './ Order.css';

const order = (props) => {
    const ingredients = Object.keys(props.ingredients).map(key => {
        return `${key} (${props.ingredients[key]})`;
    }).join(', ');

    return (
        <div className={classes.Order}>
            <p>{ingredients}</p>
            <p>{props.price} <strong>USD</strong></p>
        </div>
    );
};

export default order;