import React, { Component } from 'react';
import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        formIsValid: false,
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                validation: {
                    required: true,
                    message: 'Email is required'
                },
                value: '',
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 8,
                    message: 'Password must be at least 8 symbols'
                },
                value: '',
                valid: false,
                touched: false
            }
        },
        signUp: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = isValid && value !== '' && value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = isValid && value !== '' && value.length >= rules.minLength;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const formToUpdate = {
            ...this.state.authForm
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

        this.setState({ authForm: formToUpdate, formIsValid: formIsValid });
    }

    onAuthSubmitHandler = (event) => {
        event.preventDefault();

        this.props.auth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.signUp);
    }

    changeAuthModeHandler = () => {
        this.setState((oldState) => {
            return {
                signUp: !oldState.signUp
            };
        });
    }

    render() {
        const formConfig = [];
        for (let key in this.state.authForm) {
            const element = this.state.authForm[key];
            formConfig.push({
                id: key,
                elementType: element.elementType,
                elementConfig: element.elementConfig,
                value: element.value,
                valid: element.valid,
                validation: element.validation,
                touched: element.touched
            });
        }

        const formElements = formConfig.map(el => {
            return (
                <Input
                    key={el.id}
                    elementType={el.elementType}
                    elementConfig={el.elementConfig}
                    value={el.value}
                    invalid={!el.valid}
                    shouldValidate={el.validation && el.touched}
                    validationMessage={el.validation ? el.validation.message : null}
                    changed={(event) => this.inputChangedHandler(event, el.id)} />
            );
        });

        let form = (
            <div>
                <form onSubmit={this.onAuthSubmitHandler}>
                    {formElements}
                    <Button btnType="Success" type="submit" disabled={!this.state.formIsValid}>Submit</Button>
                </form>
                <Button btnType="Normal" clicked={this.changeAuthModeHandler}>
                    {this.state.signUp ? "Switch to Sign In" : "Switch to Sign Up"}
                </Button>
            </div>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.Auth}>
                <h3>Sign Up</h3>
                {form}
            </div>);
    };
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);