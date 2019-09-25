import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true });
        axios.get('/orders.json')
            .then((response) => {
                const fetchedOrders = [];
                for (const key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }

                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch((error) => {
                this.setState({ loading: false });
                console.log(error);
            });
    }

    render() {
        let orders = this.state.orders.map(o => {
            return <Order key={o.id} ingredients={o.ingredients} price={+o.price} />;
        });

        if (this.state.loading) {
            orders = <Spinner />
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);