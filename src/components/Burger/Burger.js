import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient ingredientType="bread-top" />
            <BurgerIngredient ingredientType="cheese" />
            <BurgerIngredient ingredientType="meat" />
            <BurgerIngredient ingredientType="salad" />
            <BurgerIngredient ingredientType="bread-bottom" />
        </div>
    );
};

export default burger;