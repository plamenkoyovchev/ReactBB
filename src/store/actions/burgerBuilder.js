import * as actionTypes from './actionTypes';
import { INGREDIENT_PRICES } from './ingredientPrices';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    };
};

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    };
};

const setIngredients = (ingredients, totalPrice) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
        totalPrice: totalPrice
    };
};

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                let totalPrice = 0;
                for (let key in response.data) {
                    totalPrice += (response.data[key] * INGREDIENT_PRICES[key]);
                }

                dispatch(setIngredients(response.data, totalPrice));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};