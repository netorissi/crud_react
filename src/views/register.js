import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// ## --------- ACTIONS --------- ## //
import * as acUsers from '../actions/users';

// ## --------- MATERIAL-UI --------- ## //
import { Grid } from '@material-ui/core';

// ## --------- COMPONENTS --------- ## //
import Stepper from '../components/Stepper';
import ListUsers from '../components/ListUsers';
import ModalUser from '../components/ModalUser';
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
        userDetail: null,
        modalUserDetail: false,
        activeStep: STEP_REGISTER_PROFILE
    }

    async componentDidMount() {
        const { dispatch } = this.props;
        await dispatch(acUsers.getUsers());
    }

    changeStep = activeStep => this.setState({ activeStep });

    resetUser = () => this.setState({ userCurrent: {...newUser} });

    editUser = user => {
        this.setState({ 
            userCurrent: {...user},
            activeStep: STEP_REGISTER_PROFILE,
            modalUserDetail: false
        });
    }
    
    deleteUser = async user => {
        const { dispatch } = this.props;
        await dispatch(acUsers.deleteUsers(user));
        this.setState({ modalUserDetail: false });
    }
    
    viewUser = user => {
        this.setState({ 
            userDetail: {...user},
            modalUserDetail: true
        });
    }

    closeUserDetail = () => {
        this.setState({ 
            userDetail: null,
            modalUserDetail: false
        });
    }

    render() {

        const { activeStep, userCurrent, modalUserDetail, userDetail } = this.state;
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
                        <ListUsers 
                        users={users}
                        editUser={this.editUser}
                        viewUser={this.viewUser}
                        />
                    </div>
                </Grid>

                <Grid item xs={12}>
                    {modalUserDetail && userDetail && (
                        <ModalUser 
                        open={modalUserDetail}
                        close={this.closeUserDetail}
                        userDetail={userDetail}
                        editUser={this.editUser}
                        deleteUser={this.deleteUser}
                        />
                    )}
                </Grid>

            </Grid>
        )
    }
}

const mapStateToProps = state => ({
	rdUsers: state.rdUsers
});

export default withRouter(connect(mapStateToProps)(Register));