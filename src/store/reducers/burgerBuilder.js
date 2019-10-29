import * as actionTypes from '../actions/actionTypes';
import { INGREDIENT_PRICES } from '../actions/ingredientPrices';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
};

const addIngredient = (state, action) => {
    const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };

    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    const updatedIngr = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngrs = updateObject(state.ingredients, updatedIngr);
    const updtState = {
        ingredients: updatedIngrs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updtState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: { ...action.ingredients },
        totalPrice: action.totalPrice,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        ingredients: { ...action.ingredients },
        error: true
    });
};

export default reducer;