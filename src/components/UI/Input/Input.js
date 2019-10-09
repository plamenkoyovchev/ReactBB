import React from 'react';

import classes from './Input.css';

const input = (props) => {
    return generateElement(props);
};

const generateElement = function (props) {
    const inputClasses = [classes.InputElement];
    let element = '';

    let validationMessage = null;
    if (props.shouldValidate && props.invalid) {
        validationMessage = <p className={classes.ValidationMessage}>{props.validationMessage}</p>;
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            element = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'select':
            const options = props.elementConfig.options.map((option) => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
            });
            element =
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {options}
                </select>
            break;
        default:
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {element}
            {validationMessage}
        </div>);
};

export default input;