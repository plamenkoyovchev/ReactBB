import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../../components/Burger/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

class Checkout extends Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />
                    <Route
                        path={this.props.match.url + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);