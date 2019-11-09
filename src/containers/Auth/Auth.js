import React, { useState, useEffect } from 'react';
import classes from './Auth.css';

import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { checkValidity } from '../../shared/utility';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const auth = props => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [authForm, setAuthForm] = useState({
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
    });
    const [signUp, setSignUp] = useState(false);
    const { building, authRedirectPath, onSetAuthRedirectPath } = props;

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetAuthRedirectPath('/');
        }
    }, [building, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, inputId) => {
        const formToUpdate = {
            ...authForm
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

        setAuthForm(formToUpdate);
        setFormIsValid(formIsValid);
    }

    const onAuthSubmitHandler = (event) => {
        event.preventDefault();

        props.auth(authForm.email.value, authForm.password.value, signUp);
    }

    const changeAuthModeHandler = () => {
        setSignUp(!signUp);
    }

    if (props.isLoggedIn) {
        return <Redirect to={authRedirectPath} />;
    }

    const formConfig = [];
    for (let key in authForm) {
        const element = authForm[key];
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
                changed={(event) => inputChangedHandler(event, el.id)} />
        );
    });

    let form = (
        <div>
            <form onSubmit={onAuthSubmitHandler}>
                {formElements}
                <Button btnType="Success" type="submit" disabled={!formIsValid}>Submit</Button>
            </form>
            <Button btnType="Normal" clicked={changeAuthModeHandler}>
                {signUp ? "Switch to Sign In" : "Switch to Sign Up"}
            </Button>
        </div>
    );
    if (props.loading) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{errorCodes[props.error.message] || props.error.message}</p>;
    }

    return (
        <div className={classes.Auth}>
            <h3>{signUp ? "Sign Up" : "Sign In"}</h3>
            {errorMessage}
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isLoggedIn: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burgerBuilder.building,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);

const errorCodes = {
    EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
    INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
    USER_DISABLED: "The user account has been disabled by an administrator.",
    EMAIL_EXISTS: "The email address is already in use by another account.",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later."
};