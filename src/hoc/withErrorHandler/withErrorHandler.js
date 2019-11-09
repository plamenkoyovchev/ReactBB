import React, { useState, useEffect } from 'react';

import Auxilary from '../Auxilary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);
        const requestInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        });
        const responseInterceptor = axios.interceptors.response.use(response => response, error => {
            setError(error);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            };
        }, [requestInterceptor, responseInterceptor]);

        const errorHandlerConfirmed = () => {
            setError(null);
        }

        return (
            <Auxilary>
                <Modal
                    show={error}
                    modalClosed={errorHandlerConfirmed}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxilary>
        );
    }
}

export default withErrorHandler;
