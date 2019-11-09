import React, { useState } from 'react';

import axios from '../../../../axios-orders';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';

import { connect } from 'react-redux';
import * as orderActions from '../../../../store/actions/index';
import { checkValidity } from '../../../../shared/utility';

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';

import classes from './ContactData.css';

const contactData = props => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter your name'
            },
            validation: {
                required: true,
                minLength: 2,
                maxLength: 20,
                message: 'Name should be between 2 and 20 symbols'
            },
            value: '',
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your e-mail'
            },
            validation: {
                required: true,
                minLength: 2,
                maxLength: 20,
                message: 'Email should be between 2 and 20 symbols'
            },
            value: '',
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter your country'
            },
            value: '',
            valid: true,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter your street'
            },
            value: '',
            valid: true,
            touched: false
        },
        postal: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Enter postal code'
            },
            value: '',
            valid: true,
            touched: false
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
            validation: {
                required: true
            },
            value: 'standard',
            valid: false,
            touched: false
        }
    });

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (const key in orderForm) {
            formData[key] = orderForm[key].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: +props.price.toFixed(2),
            orderData: formData,
            userId: props.userId
        };

        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputId) => {
        const formToUpdate = {
            ...orderForm
        };
        const elementToUpdate = {
            ...formToUpdate[inputId]
        };

        elementToUpdate.value = event.target.value;
        elementToUpdate.valid = checkValidity(event.target.value, elementToUpdate.validation);
        elementToUpdate.touched = true;
        formToUpdate[inputId] = elementToUpdate;

        let formIsValid = true;
        for (let key in formToUpdate) {
            formIsValid = formIsValid && checkValidity(formToUpdate[key].value, formToUpdate[key].validation);
        }

        setOrderForm(formToUpdate);
        setFormIsValid(formIsValid);
    }

    const formConfig = [];
    for (let key in orderForm) {
        formConfig.push({
            id: key,
            elementType: orderForm[key].elementType,
            elementConfig: orderForm[key].elementConfig,
            value: orderForm[key].value,
            valid: orderForm[key].valid,
            validation: orderForm[key].validation,
            touched: orderForm[key].touched
        });
    }

    const formElements = formConfig.map((el) => {
        return <Input
            key={el.id}
            elementType={el.elementType}
            elementConfig={el.elementConfig}
            value={el.value}
            invalid={!el.valid}
            shouldValidate={el.validation && el.touched}
            validationMessage={el.validation ? el.validation.message : null}
            changed={(event) => inputChangedHandler(event, el.id)} />
    });

    let form = (
        <form onSubmit={orderHandler}>
            {formElements}
            <Button btnType="Success" type="submit" disabled={!formIsValid}>ORDER</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData}>
            <h3>Contact data</h3>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));