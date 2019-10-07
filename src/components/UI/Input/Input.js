import React from 'react';

import classes from './Input.css';

const input = (props) => {
    return generateElement(props);
};

const generateElement = function (props) {
    let element = '';
    switch (props.elementType) {
        case 'input':
            element = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case 'select':
            const options = props.elementConfig.options.map((option) => {
                return <option key={option.value} value={option.value}>{option.displayValue}</option>
            });
            element =
                <select className={classes.InputElement} value={props.value} onChange={props.changed}>
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
        </div>);
};

export default input;