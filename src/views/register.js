import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// ## --------- MATERIAL-UI --------- ## //
import * as acUsers from '../actions/users';

// ## --------- MATERIAL-UI --------- ## //
import { Grid, Paper } from '@material-ui/core';

// ## --------- COMPONENTS --------- ## //
import Stepper from '../components/Stepper';
import ListUsers from '../components/ListUsers';
import StepProfile from '../components/register/StepProfile';
import StepAddress from '../components/register/StepAddress';

// ## --------- ICONS --------- ## //
import { MdPerson, MdPlace } from 'react-icons/md';

// ## --------- HELPERS --------- ## //
import { 
    STEP_REGISTER_PROFILE,
    STEP_REGISTER_ADDRESS 
} from '../helpers/constants';

const titleSteps = [
	'Perfil',
	'Endereço'
];

const iconsSteps = {
	1: <MdPerson/>,
	2: <MdPlace/>
}

const newUser = {
    firstName: '',
    lastName: '',
    document: '',
    email: null,
    phone: null,
    cellphone: '',
    address: '',
    number: null,
    complement: null,
    neighborhood: '',
    city: '',
    state: '',
    country: 'BR',
    zipcode: ''
}

class Register extends Component {

    state = {
        userCurrent: {...newUser},
        activeStep: STEP_REGISTER_PROFILE
    }

    async componentDidMount() {
        const { dispatch } = this.props;
        await dispatch(acUsers.getUsers());
    }

    changeStep = activeStep => this.setState({ activeStep });

    resetUser = () => this.setState({ userCurrent: {...newUser} });

    render() {

        const { activeStep, userCurrent } = this.state;
        const { users } = this.props.rdUsers;
        
        return (
            <Grid container>

                <Grid item xs={12}>
                    <Stepper
                    iconsSteps={iconsSteps}
                    activeStep={activeStep}
                    titleSteps={titleSteps}
                    />
                </Grid>
                
                <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    {activeStep === STEP_REGISTER_PROFILE && (
                        <StepProfile 
                        userCurrent={userCurrent}
                        changeStep={this.changeStep}
                        resetUser={this.resetUser}
                        />
                    )}
                    {activeStep === STEP_REGISTER_ADDRESS && (
                        <StepAddress 
                        userCurrent={userCurrent}
                        changeStep={this.changeStep}
                        resetUser={this.resetUser}
                        />
                    )}
                </Grid>

                <Grid item xs={12} style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    backgroundColor: '#fff', 
                    padding: 20,
                    marginTop: 20
                }}>
                    <div style={{ width: '100%', maxWidth: 1280 }}>
                        <ListUsers users={users}/>
                    </div>
                </Grid>

            </Grid>
        )
    }
}

const mapStateToProps = state => ({
	rdUsers: state.rdUsers
});

export default withRouter(connect(mapStateToProps)(Register));