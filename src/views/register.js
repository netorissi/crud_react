import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

// ## --------- COMPONENTS --------- ## //
import Stepper from '../components/Stepper';
import StepProfile from '../components/register/StepProfile';
import StepAddress from '../components/register/StepAddress';

// ## --------- ICONS --------- ## //
import { MdPerson, MdPlace } from 'react-icons/md';

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

class Register extends Component {

    state = {
        activeStep: STEP_REGISTER_PROFILE
    }

    changeStep = activeStep => this.setState({ activeStep });

    render() {

        const { activeStep } = this.state;
        
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
                    {activeStep === STEP_REGISTER_PROFILE && <StepProfile/>}
                    {activeStep === STEP_REGISTER_ADDRESS && <StepAddress/>}
                </Grid>

            </Grid>
        )
    }
}

export default Register;