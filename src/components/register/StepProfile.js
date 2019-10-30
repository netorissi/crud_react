import React, { Component } from 'react';
import clsx from 'clsx';

// ## --------- MATERIAL-UI --------- ## //
import { withStyles, Grid, TextField, Button } from '@material-ui/core';

// ## --------- ICONS --------- ## //
import { MdSend } from 'react-icons/md';

// ## --------- STYLES --------- ## //
import style from '../../assets/styles/stepProfile';

// ## --------- HELPERS --------- ## //
import * as formatters from '../../helpers/formatters';

const newProfile = {
    avatar: null,
    firstName: '',
    lastName: '',
    document: '',
    email: null,
    phone: null,
    cellphone: ''
}

class StepProfile extends Component {
    
    state = {
        profile: {...newProfile},
        checkProfile: false
    }

    inputChange = (event, field) => {
		let { profile } = this.state;
        if (field === "firstName") 
            profile.firstName = event.target.value.toUpperCase();
        if (field === "lastName") 
            profile.lastName = event.target.value.toUpperCase();
        if (field === "document") 
            profile.document = formatters.cpfCnpjMask(event.target.value);
        if (field === "email") 
            profile.email = formatters.removeAccents(event.target.value.toLowerCase());
        if (field === "phone") 
            profile.phone = formatters.phoneMask(event.target.value);
        if (field === "cellphone") 
            profile.cellphone = formatters.phoneMask(event.target.value);

		// if (field === "address") client.address = event.target.value.toUpperCase();
		// if (field === "number") client.number = event.target.value.toUpperCase();
		// if (field === "neighborhood") client.neighborhood = event.target.value.toUpperCase();
		// if (field === "complement") client.complement = event.target.value.toUpperCase();
		// if (field === "city") client.city = event.target.value.toUpperCase();
		// if (field === "state") client.state = event.target.value;
        this.setState({ profile });
        this.checkProfile();
    }
    
    checkProfile = () => {
        let { profile, checkProfile } = this.state;
        const digitsDocument = profile.document ? profile.document.replace(/\D+/g, "") : [];

        if (
            profile.firstName &&
            profile.lastName &&
            digitsDocument.length >= 11 && 
            digitsDocument.length <= 14 &&
            profile.email &&
            profile.cellphone
        ) {
            checkProfile = true;
        }
        else {
            checkProfile = false;
        }
        this.setState({ checkProfile });
    }

    render() {

        const { classes } = this.props;
        const { profile, checkProfile } = this.state;

        return (
            <Grid container className={classes.root}>
                        
                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <TextField
                    autoFocus
                    className={classes.textField}
                    value={profile.firstName}
                    label="Primeiro Nome"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'firstName')}
                    />
                </Grid>
                
                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <TextField
                    className={classes.textField}
                    value={profile.lastName}
                    label="Sobrenome"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'lastName')}
                    />
                </Grid>

                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <TextField
                    className={classes.textField}
                    value={profile.document}
                    label="Documento"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'document')}
                    />
                </Grid>
                
                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <TextField
                    className={classes.textField}
                    value={profile.email}
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'email')}
                    />
                </Grid>

                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <TextField
                    className={classes.textField}
                    value={profile.cellphone}
                    label="Celular"
                    margin="normal"
                    variant="outlined"
                    required
                    onChange={event => this.inputChange(event, 'cellphone')}
                    />
                </Grid>
                
                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <TextField
                    className={classes.textField}
                    value={profile.phone}
                    label="Telefone"
                    margin="normal"
                    variant="outlined"
                    onChange={event => this.inputChange(event, 'phone')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid container>

                        <Grid item xs={12} className={clsx(classes.pd2, classes.alignRight)}>
                            <Button
                                disabled={!checkProfile}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<MdSend/>}
                            >
                                Avançar
                            </Button>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        )
    }
}

export default withStyles(style)(StepProfile);