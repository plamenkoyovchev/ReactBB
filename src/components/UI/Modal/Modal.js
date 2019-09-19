import React, { Component } from 'react';
import classes from './Modal.css';

import Auxilary from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show ||
            this.props.children !== nextProps.children;
    }

    render() {
        return (
            <Auxilary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxilary>
        );
    }
}

export default Modal;