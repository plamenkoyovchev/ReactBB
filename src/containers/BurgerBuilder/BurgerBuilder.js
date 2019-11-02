import React, { Component } from 'react';
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

export class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false
        };
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, value) => {
                return sum + value;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isLoggedIn) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetRedirecthPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (const ingr in disabledInfo) {
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error
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
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchasableState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isLoggedIn={this.props.isLoggedIn} />
                </Auxilary>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.props.totalPrice} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));