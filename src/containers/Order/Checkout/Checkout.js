import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../../components/Burger/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

import { connect } from 'react-redux';

const checkout = props => {
    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.push('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />
    if (props.ingredients) {
        const redirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {redirect}
                <CheckoutSummary
                    ingredients={props.ingredients}
                    checkoutCancelled={checkoutCancelled}
                    checkoutContinued={checkoutContinued} />
                <Route
                    path={props.match.url + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(checkout);