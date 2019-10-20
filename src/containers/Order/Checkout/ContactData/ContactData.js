import React, { Component } from 'react';

import axios from '../../../../axios-orders';
import Button from '../../../../components/UI/Button/Button';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Input from '../../../../components/UI/Input/Input';

import { connect } from 'react-redux';
import * as orderActions from '../../../../store/actions/index';

import withErrorHandler from '../../../../hoc/withErrorHandler/withErrorHandler';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        formIsValid: false,
        orderForm: {
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
        }
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (const key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData
        };

        this.props.onOrderBurger(order);
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = isValid && value && value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
        }

        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const formToUpdate = {
            ...this.state.orderForm
        };
        const elementToUpdate = {
            ...formToUpdate[inputId]
        };

        elementToUpdate.value = event.target.value;
        elementToUpdate.valid = this.checkValidity(event.target.value, elementToUpdate.validation);
        elementToUpdate.touched = true;
        formToUpdate[inputId] = elementToUpdate;

        let formIsValid = true;
        for (let key in formToUpdate) {
            formIsValid = formIsValid && this.checkValidity(formToUpdate[key].value, formToUpdate[key].validation);
        }

        this.setState({ orderForm: formToUpdate, formIsValid: formIsValid });
    }

    render() {
        const formConfig = [];
        for (let key in this.state.orderForm) {
            formConfig.push({
                id: key,
                elementType: this.state.orderForm[key].elementType,
                elementConfig: this.state.orderForm[key].elementConfig,
                value: this.state.orderForm[key].value,
                valid: this.state.orderForm[key].valid,
                validation: this.state.orderForm[key].validation,
                touched: this.state.orderForm[key].touched
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
                changed={(event) => this.inputChangedHandler(event, el.id)} />
        });

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements}
                <Button btnType="Success" type="submit" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice,
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));