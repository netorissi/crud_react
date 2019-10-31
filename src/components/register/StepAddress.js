import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import cep from 'cep-promise';

// ## --------- ACTIONS --------- ## //
import * as acToaster from '../../actions/toaster';
import * as acUsers from '../../actions/users';

// ## --------- MATERIAL-UI --------- ## //
import { withStyles, Grid, TextField, MenuItem, Button, Typography } from '@material-ui/core';

// ## --------- ICONS --------- ## //
import { MdSend, MdUndo } from 'react-icons/md';

// ## --------- STYLES --------- ## //
import style from '../../assets/styles/stepAddress';

// ## --------- HELPERS --------- ## //
import * as formatters from '../../helpers/formatters';
import { STEP_REGISTER_PROFILE, statesForSelect, countriesForSelect } from '../../helpers/constants';

class StepAddress extends Component {

    constructor(props) {
        super(props)

        const userCurrent = props.userCurrent;
        
        this.state = {
            userCurrent,
            checkAddress: false,
            checkZipcode: false
        }
    }

    inputChange = (event, field) => {
		let { userCurrent } = this.state;

		if (field === "address") userCurrent.address = event.target.value.toUpperCase();
		if (field === "number") userCurrent.number = event.target.value.toUpperCase();
		if (field === "neighborhood") userCurrent.neighborhood = event.target.value.toUpperCase();
		if (field === "complement") userCurrent.complement = event.target.value.toUpperCase();
		if (field === "city") userCurrent.city = event.target.value.toUpperCase();
        if (field === "state") userCurrent.state = event.target.value;
        if (field === "zipcode") {
            userCurrent.zipcode = formatters.zipCodeMask(event.target.value);
            const zipcodeNumber = event.target.value.replace(/\D+/g, "");
            if (zipcodeNumber.length === 8) this.searchZipcode(zipcodeNumber);
        }
        
        this.setState({ userCurrent });
        this.checkAddress();
    }

    searchZipcode = async zipcodeNumber => {
		const { userCurrent } = this.state;
		const { dispatch } = this.props;

		if (zipcodeNumber.length === 8) {

			await cep(zipcodeNumber)
			.then(response => {
				if (response) {
                    console.log(response)
                    userCurrent.address = response.street 
                        ? response.street.toUpperCase() 
                        : "";
                    userCurrent.neighborhood = response.neighborhood 
                        ? response.neighborhood.toUpperCase() 
                        : "";
                    userCurrent.city = response.city 
                        ? response.city.toUpperCase() 
                        : "";
                    userCurrent.state = response.state 
                        ? response.state.toUpperCase() 
                        : "";
					this.setState({ userCurrent, checkZipcode: true });
				}
			})
			.catch(() => {
				this.setState({ checkZipcode: true });
				dispatch(acToaster.ACTIVE_TOASTER(
					"info",
					"Por favor, insira os campos de endereço!"
				))
			})
		} else {
			this.setState({ checkZipcode: false });
		}
	}
    
    checkAddress = () => {
        let { userCurrent, checkAddress } = this.state;

        if (
            userCurrent.address &&
            userCurrent.neighborhood &&
            userCurrent.city &&
            userCurrent.state &&
            userCurrent.country &&
            userCurrent.zipcode
        ) {
            checkAddress = true;
        }
        else {
            checkAddress = false;
        }
        this.setState({ checkAddress });
    }

    registerAddress = async () => {
        const { userCurrent, checkAddress } = this.state;
        const { changeStep, resetUser, dispatch } = this.props;

        if (checkAddress) {
            
            if (userCurrent.id)
                await dispatch(acUsers.putUsers(userCurrent));
            else
                await dispatch(acUsers.postUsers(userCurrent));
            
            resetUser();
            changeStep(STEP_REGISTER_PROFILE);
        }
        else {
            await dispatch(acToaster.ACTIVE_TOASTER(
                'error',
                'Por favor, preencha os campos obrigatórios corretamente!'
            ))
        }
    }

    backStep = () => {
        const { changeStep } = this.props;
        changeStep(STEP_REGISTER_PROFILE);
    }

    render() {

        const { classes } = this.props;
        const { userCurrent, checkAddress, checkZipcode } = this.state;

        return (
            <Grid container className={classes.root}>

                <Grid item xs={12} className={classes.pd2}>
                    <Typography variant="h6" align="center">
                        Preencha abaixo os dados do seu endereço:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                        * campos obrigatórios
                    </Typography>
                </Grid>
                        
                <Grid item md={4} sm={6} xs={12} className={classes.pd2}>
                    <TextField
                    autoFocus
                    className={classes.textField}
                    value={userCurrent.zipcode}
                    label="CEP"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'zipcode')}
                    />
                </Grid>
                
                <Grid item md={8} sm={6} xs={12} className={classes.pd2}>
                    <TextField
                    disabled={!checkZipcode}
                    className={classes.textField}
                    value={userCurrent.address}
                    label="Endereço"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'address')}
                    />
                </Grid>

                <Grid item md={3} sm={6} xs={12} className={classes.pd2}>
                    <TextField
                    disabled={!checkZipcode}
                    className={classes.textField}
                    value={userCurrent.number || ''}
                    label="Número"
                    margin="normal"
                    variant="outlined"
                    onChange={event => this.inputChange(event, 'number')}
                    />
                </Grid>
                
                <Grid item md={6} sm={6} xs={12} className={classes.pd2}>
                    <TextField
                    disabled={!checkZipcode}
                    className={classes.textField}
                    value={userCurrent.complement || ''}
                    label="Complemento"
                    margin="normal"
                    variant="outlined"
                    onChange={event => this.inputChange(event, 'complement')}
                    />
                </Grid>

                <Grid item md={3} sm={6} xs={12} className={classes.pd2}>
                    <TextField
                    disabled={!checkZipcode}
                    className={classes.textField}
                    value={userCurrent.neighborhood}
                    label="Bairro"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'neighborhood')}
                    />
                </Grid>
                
                <Grid item md={4} sm={6} xs={12} className={classes.pd2}>
                    <TextField
                    disabled={!checkZipcode}
                    className={classes.textField}
                    value={userCurrent.city}
                    label="Cidade"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'city')}
                    />
                </Grid>
                
                <Grid item md={4} sm={6} xs={12} className={classes.pd2}>
                    <TextField
                        disabled={!checkZipcode}
                        select
                        className={classes.textField}
                        value={userCurrent.state}
                        label="Estado"
                        margin="normal"
                        variant="outlined"
                        required
                        onChange={event => this.inputChange(event, 'state')}
                    >
                        {
                            statesForSelect &&
                            statesForSelect.length > 0 &&
                            statesForSelect.map((state, i) => (
                                <MenuItem 
                                    key={i} 
                                    value={state.value}
                                >
                                    {state.label.toUpperCase()}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>

                <Grid item md={4} sm={6} xs={12} className={classes.pd2}>
                    <TextField
                    disabled={!checkZipcode}
                    select
                    className={classes.textField}
                    value={userCurrent.country}
                    label="País"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'country')}
                    >
                        {
                            countriesForSelect &&
                            countriesForSelect.length > 0 &&
                            countriesForSelect.map((country, i) => (
                                <MenuItem 
                                    key={i} 
                                    value={country.value}
                                >
                                    {country.label.toUpperCase()}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <Grid container>

                        <Grid item xs={6} className={clsx(classes.pd2, classes.alignLeft)}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                startIcon={<MdUndo/>}
                                onClick={this.backStep}
                            >
                                Voltar
                            </Button>
                        </Grid>
                        
                        <Grid item xs={6} className={clsx(classes.pd2, classes.alignRight)}>
                            <Button
                                disabled={!checkAddress}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<MdSend/>}
                                onClick={this.registerAddress}
                            >
                                Finalizar
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        )
    }
}

const mapStateToProps = state => ({
	rdUsers: state.rdUsers
});

export default withRouter(connect(mapStateToProps)(withStyles(style)(StepAddress)));