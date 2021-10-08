import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AppRoute} from '../../const';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: AppRoute.ROOT, state: {from: props.location} }}
        />
      )
    }
  />
);

export default PrivateRoute;
