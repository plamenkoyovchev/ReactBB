const INGREDIENT_PRICES = {
    salad: 0.7,
    bacon: 0.8,
    meat: 1.4,
    cheese: 1.1
};

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case 'REMOVE_INGREDIENT':
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: Math.abs(state.totalPrice - INGREDIENT_PRICES[action.ingredientName])
            }
        default:
            return state;
    }
};

export default reducer;