import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../../components/Burger/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 0,
            salad: 0,
            cheese: 0,
            bacon: 0
        }
    }

    componentDidMount() {
        const ingredients = {};
        const queryParams = new URLSearchParams(this.props.location.search);
        for (let qp of queryParams.entries()) {
            ingredients[qp[0]] = +qp[1];
        }

        this.setState({ ingredients: ingredients });
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued} />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
}

export default Checkout;