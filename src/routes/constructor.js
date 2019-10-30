import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

// ## --------- COMPONENTS --------- ## //
import Header from '../components/Header';

// ## --------- ROUTES --------- ## //
import * as routes from './names';

// ## --------- VIEWS --------- ## //
import Register from '../views/register';
import UserDetails from '../views/userDetails';
import NotFound404 from '../views/notFound404';

const RouteDefault = ({ component: Component, ...rest }) => (
	<Route
	{...rest}
	render={props => (
        <Fragment>
			<Header/>
			<Component {...props} />
		</Fragment>
	)}/>
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
            path={`${routes.USER_DETAIL}/:userId`} 
            exact 
            component={UserDetails} 
            />

            {/* <RouteDefault 
            path='/' 
            component={props => {
                <Redirect to={{
                    pathname: routes.REGISTER,
                    state: { from: props.location }
                }}/>
            }} 
            /> */}

            <RouteDefault 
            path='*' 
            component={NotFound404} 
            />
        </Switch>
	)
}

export default Routes;