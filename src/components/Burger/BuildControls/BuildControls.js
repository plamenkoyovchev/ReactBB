import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const ingredients = [
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
    { label: 'Salad', type: 'salad' }
];

const buildControls = (props) => {
    const controls = ingredients.map((ingr) => {
        return <BuildControl
            key={ingr.label}
            label={ingr.label}
            add={() => props.addIngredient(ingr.type)}
            remove={() => props.removeIngredient(ingr.type)}
            disabled={props.disabled[ingr.type]}
        />;
    });

    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>
                {props.isLoggedIn ? "ORDER" : "SIGN UP TO ORDER"}
            </button>
        </div>
    );
};

export default buildControls;