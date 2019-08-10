import React from 'react';

import classes from './BurgerIngredient.css';

const burgerIngredient = (props) => {
    let ingredient = null;
    if (ingredientTypeToCssClass[props.ingredientType]) {
        const ingredientType = ingredientTypeToCssClass[props.ingredientType];
        if (props.ingredientType !== 'bread-top') {
            ingredient = <div className={ingredientType}></div>;
        } else {
            ingredient = (
                <div className={ingredientType}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
        }
        ingredient = ingredientTypeToCssClass[props.ingredientType];
    }

    return ingredient;
}

const ingredientTypeToCssClass = {
    "bread-bottom": classes.BreadBottom,
    "bread-top": classes.BreadTop,
    "meat": classes.Meat,
    "cheese": classes.Cheese,
    "bacon": classes.Bacon,
    "salad": classes.Salad
};

export default burgerIngredient;