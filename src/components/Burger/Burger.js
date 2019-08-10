import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const burgerIngredients = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, index) => {
            return <BurgerIngredient key={igKey + index} ingredientType={igKey} />;
        })
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient ingredientType="bread-top" />
            {burgerIngredients}
            <BurgerIngredient ingredientType="bread-bottom" />
        </div>
    );
};

export default burger;