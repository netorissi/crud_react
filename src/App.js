import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { CssBaseline } from '@material-ui/core';

// ## ---------------------------------------------------------------------------------------------- COMPONENTS
import Toaster from './components/Toaster';
import Routes from '../routes/constructor';

const App = props => {
	if (window) window.scrollTo(0, 0);

	const toaster = props.toaster;

	return (
		<Fragment>
			<CssBaseline />
			<Toaster {...toaster} />
			<Routes />
		</Fragment>
	)
}

const mapStateToProps = state => ({
	toaster: state.rdToaster
});

export default withRouter(connect(mapStateToProps)(App));
