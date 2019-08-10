import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let burgerIngredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <BurgerIngredient key={igKey + index} ingredientType={igKey} />;
            });
        })
        .reduce((acc, currValue) => {
            return acc.concat(currValue);
        }, []);

    if (burgerIngredients.length <= 0) {
        burgerIngredients = <p><strong>Please add ingredients!</strong></p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient ingredientType="bread-top" />
            {burgerIngredients}
            <BurgerIngredient ingredientType="bread-bottom" />
        </div>
    );
};

export default burger;