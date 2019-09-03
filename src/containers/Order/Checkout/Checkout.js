import React, { Component } from 'react';

import CheckoutSummary from '../../../components/Burger/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            salad: 1,
            cheese: 1,
            bacon: 1
        }
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
            </div>
        );
    }
}

export default Checkout;