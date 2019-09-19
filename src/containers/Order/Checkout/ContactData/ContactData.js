import React, { Component } from 'react';

import Button from '../../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    };



    render() {
        return (
            <div className={classes.ContactData}>
                <h3>Contact data</h3>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="enter your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="enter your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="enter your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="enter your postal code" />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;