import React from 'react';
import clsx from 'clsx';

// ## --------- MATERIAL-UI --------- ## //
import { 
    withStyles,
    Grid,
    Typography,
    Dialog,
    DialogContent,
    Slide,
    Button,
    useMediaQuery,
    Divider
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// ## --------- STYLES --------- ## //
import style from '../assets/styles/users';

// ## --------- ICONS --------- ## //
import { MdClose, MdPerson, MdPlace, MdEdit, MdDeleteForever } from 'react-icons/md';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ModalUser = props => {
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { classes, open, userDetail, close, editUser, deleteUser } = props;
    
    return (
        <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={close}
      >
        <DialogContent className={classes.pdModal}>
            <Grid container>
                <Grid item xs={12} className={clsx(classes.pd2, classes.alignCenter)}>
                    <Typography variant="h4">Detalhes</Typography>
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                                startIcon={<MdEdit/>}
                                onClick={() => editUser(userDetail)}
                            >
                                Editar Cadastro
                            </Button>
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                className={classes.button}
                                startIcon={<MdDeleteForever/>}
                                onClick={() => deleteUser(userDetail)}
                            >
                                Excluir Cadastro
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px auto' }}/>
                </Grid>

                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <Typography variant="h6">
                        <MdPerson style={{ marginBottom: -3 }}/> DADOS DO PERFIL
                    </Typography>
                    <Typography variant="body2">
                        <strong>{`${userDetail.firstName} ${userDetail.lastName}`}</strong>
                    </Typography>
                    <Typography variant="body2">
                        {`Documento: ${userDetail.document}`}
                    </Typography>
                    <Typography variant="body2">
                        {`Email: ${userDetail.email ? userDetail.email : 'N/I'}`}
                    </Typography>
                    <Typography variant="body2">
                        {`Celular: ${userDetail.cellphone}`}
                    </Typography>
                    <Typography variant="body2">
                        {`Telefone: ${userDetail.phone ? userDetail.phone : 'N/I'}`}
                    </Typography>
                </Grid>

                <Grid item md={6} sm={12} xs={12} className={classes.pd2}>
                    <Typography variant="h6">
                        <MdPlace style={{ marginBottom: -3 }}/> DADOS DO ENDEREÇO
                    </Typography>
                    <Typography variant="body2">
                        {console.log(userDetail.complement)}
                        {`Endereço: 
                            ${userDetail.address}
                            ${userDetail.number !== null ? `, ${userDetail.number}` : ''}
                            ${userDetail.complement ? `, ${userDetail.complement}` : ''},
                            ${userDetail.zipcode}
                        `}
                    </Typography>
                    <Typography variant="body2">
                        {`Bairro: ${userDetail.neighborhood}`}
                    </Typography>
                    <Typography variant="body2">
                        {`Cidade: ${userDetail.city}/${userDetail.state} - ${userDetail.country}`}
                    </Typography>
                </Grid>

                <Grid item xs={12} className={clsx(classes.pd2, classes.alignCenter)}>
                    <Divider style={{ margin: '10px auto' }}/>
                    <Button
                        variant="outlined"
                        color="secondary"
                        className={classes.button}
                        startIcon={<MdClose/>}
                        onClick={close}
                    >
                        Fechar
                    </Button>
                </Grid>

            </Grid>
        </DialogContent>
      </Dialog>
    )
}

export default withStyles(style)(ModalUser);