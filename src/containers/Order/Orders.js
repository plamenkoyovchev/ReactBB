import React, { useEffect } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const orders = props => {
    const { fetchOrders } = props;

    useEffect(() => {
        fetchOrders(props.token, props.userId);
    }, [fetchOrders]);

    let orders = props.orders.map(o => {
        return <Order key={o.id} ingredients={o.ingredients} price={+o.price} />;
    });

    if (props.loading) {
        orders = <Spinner />
    }

    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));