import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const Authroute = ({ component: Component, authenticated, ...rest}) => (
    <Route {...rest} render={(props) => authenticated ? <Redirect to='/'/> : <Component {...props} />} />
)

export default Authroute;
