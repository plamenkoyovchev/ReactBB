import React, { Component } from 'react';
import axios from '../../axios-orders';

import Auxilary from '../../hoc/Auxilary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
            totalPrice: 2,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data })
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    }

    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, value) => {
                return sum + value;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        const newCount = oldCount + 1;

        const newIngredients = {
            ...this.props.ingredients
        };
        newIngredients[type] = newCount;

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

        //this.setState({ ingredients: newIngredients, totalPrice: newPrice });
        this.updatePurchasableState(newIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        const newCount = oldCount - 1;
        const newIngredients = {
            ...this.props.ingredients
        };
        newIngredients[type] = newCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

        //this.setState({ ingredients: newIngredients, totalPrice: newPrice });
        this.updatePurchasableState(newIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let key in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(this.state.ingredients[key])}`);
        }

        queryParams.push(`price=${this.state.totalPrice}`);

        this.props.history.push({
            pathname: '/checkout',
            search: queryParams.join('&')
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (const ingr in disabledInfo) {
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error
            ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded...!</p>
            : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        addIngredient={this.props.onIngredientAdd}
                        removeIngredient={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler} />
                </Auxilary>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredientName) => dispatch({ type: 'ADD_INGREDIENT', ingredientName: ingredientName }),
        onIngredientRemove: (ingredientName) => dispatch({ type: 'REMOVE_INGREDIENT', ingredientName: ingredientName })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));