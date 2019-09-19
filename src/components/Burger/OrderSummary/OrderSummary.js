import React from 'react';

import Auxilary from '../../../hoc/Auxilary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{ textTransform: 'capitalize' }}>{key}:</span>
                    {props.ingredients[key]}
                </li>
            );
        });

    return (
        <Auxilary>
            <h3>Your order</h3>
            <p>Burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout ?</p>
            <div style={{ textAlign: 'center' }}>
                <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            </div>
        </Auxilary>
    );
};

export default orderSummary;