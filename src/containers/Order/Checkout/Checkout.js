import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../../components/Burger/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: [],
        totalPrice: 0
    }

    componentDidMount() {
        const ingredients = {};
        let price = 0;
        const queryParams = new URLSearchParams(this.props.location.search);
        for (let qp of queryParams.entries()) {
            if (qp[0] === 'price') {
                price = qp[1];
            } else {
                ingredients[qp[0]] = +qp[1];
            }
        }

        this.setState({ ingredients: ingredients, totalPrice: price });
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
                    render={(props) =>
                        (<ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props} />)}
                />
            </div>
        );
    }
}

export default Checkout;