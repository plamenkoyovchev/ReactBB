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
                validation: {
                    required: true,
                    minLength: 2,
                    maxLength: 20
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
                    maxLength: 20
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
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your street'
                },
                value: '',
                valid: false,
                touched: false
            },
            postal: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Enter postal code'
                },
                value: '',
                valid: false,
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
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (const key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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
        console.log(elementToUpdate);
        this.setState({ orderForm: formToUpdate });
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
                changed={(event) => this.inputChangedHandler(event, el.id)} />
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