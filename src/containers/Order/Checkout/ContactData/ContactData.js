import React, { Component } from 'react';

import axios from '../../../../axios-orders';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Plamen Yovchev',
                address: {
                    street: 'kalchev',
                    city: 'Sofia',
                    postCode: '1618'
                },
                email: 'test@test.com'
            }
        };

        this.setState({ loading: true });
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false })
            });
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="enter your name" />
                <input className={classes.Input} type="email" name="email" placeholder="enter your email" />
                <input className={classes.Input} type="text" name="street" placeholder="enter your street" />
                <input className={classes.Input} type="text" name="postal" placeholder="enter your postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h3>Contact data</h3>
                {form}
            </div>
        );
    }
}

export default ContactData;