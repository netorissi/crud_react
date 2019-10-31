import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// ## --------- COMPONENTS --------- ## //
import Header from '../components/Header';

// ## --------- ROUTES --------- ## //
import * as routes from './names';

// ## --------- VIEWS --------- ## //
import Register from '../views/register';
import NotFound404 from '../views/notFound404';

const RouteDefault = ({ component: Component, ...rest }) => (
	<Route
	{...rest}
	render={props => {
        if (props.location.pathname === '/') {
            return (
                <Redirect to={{
                    pathname: routes.REGISTER,
                    state: { from: props.location }
                }}/>
            )
        } else {
            return (
                <Fragment>
                    <Header/>
                    <Component {...props} />
                </Fragment>
            )
        }
    }}/>
);

const Routes = () => {
	return(
        <Switch>
            <RouteDefault 
            path={routes.REGISTER} 
            exact 
            component={Register}
            />

            <RouteDefault 
            path='*' 
            component={NotFound404} 
            />
        </Switch>
	)
}

export default Routes;