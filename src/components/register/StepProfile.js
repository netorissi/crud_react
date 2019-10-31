import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';

// ## --------- ACTIONS --------- ## //
import * as acToaster from '../../actions/toaster';
import * as acUsers from '../../actions/users';

// ## --------- MATERIAL-UI --------- ## //
import { withStyles, Grid, TextField, Button, Typography } from '@material-ui/core';

// ## --------- ICONS --------- ## //
import { MdSend, MdSave } from 'react-icons/md';

// ## --------- STYLES --------- ## //
import style from '../../assets/styles/stepProfile';

// ## --------- HELPERS --------- ## //
import * as formatters from '../../helpers/formatters';
import { STEP_REGISTER_ADDRESS } from '../../helpers/constants';

class StepProfile extends Component {

    constructor(props) {
        super(props)

        const userCurrent = props.userCurrent;
        
        this.state = {
            userCurrent,
            checkProfile: false
        }
    }

    componentDidMount() {
        if (window) window.scrollTo(0, 0);
        this.checkProfile();
    }
    
    inputChange = (event, field) => {
		let { userCurrent } = this.state;
        if (field === "firstName") 
            userCurrent.firstName = event.target.value.toUpperCase();
        if (field === "lastName") 
            userCurrent.lastName = event.target.value.toUpperCase();
        if (field === "document") 
            userCurrent.document = formatters.cpfCnpjMask(event.target.value);
        if (field === "email") 
            userCurrent.email = formatters.removeAccents(event.target.value.toLowerCase());
        if (field === "phone") 
            userCurrent.phone = formatters.phoneMask(event.target.value);
        if (field === "cellphone") 
            userCurrent.cellphone = formatters.phoneMask(event.target.value);
            
        this.setState({ userCurrent });
        this.checkProfile();
    }
    
    checkProfile = () => {
        let { userCurrent, checkProfile } = this.state;
        const digitsDocument = userCurrent.document ? userCurrent.document.replace(/\D+/g, "") : [];

        if (
            userCurrent.firstName &&
            userCurrent.lastName &&
            digitsDocument.length >= 11 && 
            digitsDocument.length <= 14 &&
            userCurrent.cellphone
        ) {
            checkProfile = true;
        }
        else {
            checkProfile = false;
        }
        this.setState({ checkProfile });
    }

    registerProfile = async () => {
        const { userCurrent, checkProfile } = this.state;
        const { changeStep, dispatch } = this.props;

        if (checkProfile) {
            
            if (userCurrent.id)
                await dispatch(acUsers.putUsers(userCurrent));

            changeStep(STEP_REGISTER_ADDRESS);

        } else {
            await dispatch(acToaster.ACTIVE_TOASTER(
                'error',
                'Por favor, preencha os campos obrigatórios corretamente!'
            ))
        }
    }

    saveProfile = async () => {
        const { userCurrent, checkProfile } = this.state;
        const { resetUser, dispatch } = this.props;

        if (checkProfile && userCurrent.id) {
            await dispatch(acUsers.putUsers(userCurrent));
            resetUser();
        }
    }

    render() {

        const { classes } = this.props;
        const { userCurrent, checkProfile } = this.state;

        return (
            <Grid container className={classes.root}>

                <Grid item xs={12} className={classes.pd2}>
                    <Typography variant="h6" align="center">
                        Olá, preencha os dados do seu perfil:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center">
                        * campos obrigatórios
                    </Typography>
                </Grid>

                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <TextField
                    autoFocus
                    className={classes.textField}
                    value={userCurrent.firstName}
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
                    value={userCurrent.lastName}
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
                    value={userCurrent.document}
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
                    value={userCurrent.email || ''}
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    onChange={event => this.inputChange(event, 'email')}
                    />
                </Grid>

                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <TextField
                    className={classes.textField}
                    value={userCurrent.cellphone}
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
                    value={userCurrent.phone || ''}
                    label="Telefone"
                    margin="normal"
                    variant="outlined"
                    onChange={event => this.inputChange(event, 'phone')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Grid container>

                        <Grid item xs={12} className={clsx(classes.pd2, classes.alignRight)}>
                            {userCurrent.id && (
                                <Button
                                    disabled={!checkProfile}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    endIcon={<MdSave/>}
                                    onClick={this.saveProfile}
                                    style={{ marginRight: 10 }}
                                >
                                    Salvar
                                </Button>
                            )}
                            <Button
                                disabled={!checkProfile}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<MdSend/>}
                                onClick={this.registerProfile}
                            >
                                {userCurrent.id && "Salvar e Avançar"}
                                {!userCurrent.id && "Avançar"}
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

export default withRouter(connect(mapStateToProps)(withStyles(style)(StepProfile)));