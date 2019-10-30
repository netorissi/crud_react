import React from 'react';
import { Switch, Route } from 'react-router-dom';

// ## --------- ROUTES --------- ## //
import * as routes from './names';

// ## --------- VIEWS --------- ## //
import Register from '../views/register';
import UserDetails from '../views/userDetails';
import NotFound404 from '../views/notFound404';

const Routes = () => {
	return(
        <Switch>
            <Route 
            path={routes.REGISTER} 
            exact 
            component={Register}
            />

            <Route 
            path={`${routes.USER_DETAIL}/:userId`} 
            exact 
            component={UserDetails} 
            />

            <Route 
            path='/' 
            render={props => {
                <Redirect to={{
                    pathname: routes.REGISTER,
                    state: { from: props.location }
                }}/>
            }} 
            />

            <Route 
            path='*' 
            component={NotFound404} 
            />
        </Switch>
	)
}

export default Routes;