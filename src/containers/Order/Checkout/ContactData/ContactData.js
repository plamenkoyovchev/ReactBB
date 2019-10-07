import React, { Component } from 'react';

import axios from '../../../../axios-orders';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your e-mail'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your country'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: ''
            },
            postal: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter postal code'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: 'standard',
                        displayValue: 'Standard delivery'
                    }, {
                        value: 'fast',
                        displayValue: 'Fast delivery'
                    }]
                },
                value: 'standard'
            }
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

    inputChangedHandler = (event) => {

    }

    render() {
        const formConfig = [];
        for (let key in this.state.orderForm) {
            formConfig.push({
                id: key,
                elementType: this.state.orderForm[key].elementType,
                elementConfig: this.state.orderForm[key].elementConfig,
                value: this.state.orderForm[key].value
            });
        }

        const formElements = formConfig.map((el) => {
            return <Input
                key={el.id}
                elementType={el.elementType}
                elementConfig={el.elementConfig}
                value={el.value}
                changed={this.inputChangedHandler} />
        });

        let form = (
            <form>
                {formElements}
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