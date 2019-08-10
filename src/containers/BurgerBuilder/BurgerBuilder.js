import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 0.8,
    meat: 1.4,
    cheese: 1.1
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                cheese: 0,
                bacon: 0,
                salad: 0,
                meat: 0
            },
            totalPrice: 2
        };
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;

        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        const newCount = oldCount - 1;
        const newIngredients = {
            ...this.state.ingredients
        };
        newIngredients[type] = newCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (const ingr in disabledInfo) {
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice} />

            </Aux>
        );
    }
}

export default BurgerBuilder;