import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';

import Auxilary from '../../hoc/Auxilary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    const [loading] = useState(false);
    const { onInitIngredients } = props;

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, value) => {
                return sum + value;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (props.isLoggedIn) {
            setPurchasing(true);
        } else {
            props.onSetRedirecthPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ingredients
    };

    for (const ingr in disabledInfo) {
        disabledInfo[ingr] = disabledInfo[ingr] <= 0;
    }

    let orderSummary = null;
    let burger = props.error
        ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded...!</p>
        : <Spinner />;

    if (props.ingredients) {
        burger = (
            <Auxilary>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    addIngredient={props.onIngredientAdd}
                    removeIngredient={props.onIngredientRemove}
                    disabled={disabledInfo}
                    price={props.totalPrice}
                    purchasable={updatePurchasableState(props.ingredients)}
                    ordered={purchaseHandler}
                    isLoggedIn={props.isLoggedIn} />
            </Auxilary>
        );

        orderSummary = <OrderSummary
            ingredients={props.ingredients}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            totalPrice={props.totalPrice} />;
    }

    if (loading) {
        orderSummary = <Spinner />;
    }

    return (
        <Auxilary>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxilary>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isLoggedIn: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdd: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemove: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onPurchaseInit: () => dispatch(burgerBuilderActions.initPurchase()),
        onSetRedirecthPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));