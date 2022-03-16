import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
  const initialState = useSelector(state => state);
  const { global } = initialState;
  const auth = global.loggedinUserId;
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
