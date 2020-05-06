import React from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import logo from '../img/logo.png';

import {LoginForm, RegistroForm} from './Logins';

function LoginDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="button-login-container">
            <Button variant="outlined" color="primary" onClick={handleClickOpen} className="normalbuttons">
                Iniciar sesión
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Iniciar sesión"}</DialogTitle>
                <img src={logo} className="logo-menu" />
                <DialogContent className="container-form-login">
                    <DialogContentText id="alert-dialog-description">
                        Entra con tu cuenta para poder acceder a todo el contenido de la plataforma.
                    </DialogContentText>
                    <LoginForm/>
                    <div className="divider"></div>
                    <div className="button-regis-login">
                    <DialogContentText id="alert-dialog-description">
                        ¿Aun no tienes cuenta?
                    </DialogContentText>
                        <RegisDialog />
                    </div>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus className="button-no-outlined">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            <div className="mobile-display-register">
                <RegisDialog />
            </div>
            
        </div> 
    );
}

function RegisDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="button-login-container">
            <Button variant="outlined" color="secondary" onClick={handleClickOpen} className="normalbuttons">
                Registrarme
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Resgistrarme"}</DialogTitle>
                <img src={logo} className="logo-menu" />
                <DialogContent className="container-form-login">
                    <DialogContentText id="alert-dialog-description">
                        Rellena el formulario para poder registrare en la aplicación
                    </DialogContentText>

                        <RegistroForm />
                    <div className="divider"></div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus className="button-no-outlined">
                        Cerrar
                        </Button>
                </DialogActions>
            </Dialog>
        </div> 
    );
}

function CrearCuenta() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="button-login-container">
            <Button variant="contained" color="secondary" onClick={handleClickOpen} >
                Crear cuenta
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Resgistrarme"}</DialogTitle>
                <img src={logo} className="logo-menu" />
                <DialogContent className="container-form-login">
                    <DialogContentText id="alert-dialog-description">
                        Rellena el formulario para poder registrare en la aplicación
                    </DialogContentText>

                    <RegistroForm />
                    <div className="divider"></div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus className="button-no-outlined">
                        Cerrar
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export { LoginDialog, CrearCuenta};