import React, { Component } from 'react';
import Aux from '../../hoc/Aux';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {
                cheese: 0,
                bacon: 0,
                salad: 0,
                meat: 0
            }
        };
    }


    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <div>Burger controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;