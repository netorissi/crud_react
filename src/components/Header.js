import React from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';

// ## --------- IMAGES --------- ## //
import logo from '../assets/images/logo_sage.png';

// ## --------- STYLES --------- ## //
import style from '../assets/styles/header';

const Header = props => {

    const { classes } = props;
    
    return (
        <Grid item xs={12} className={classes.root}>
            <img src={logo} alt=""/>
            <Typography variant="body2" color="textSecondary">
                Sistemas de Gestão Empresarial e Contabilidade
            </Typography>
        </Grid>
    )
}

export default withStyles(style)(Header);