import React, {useState} from 'react';
import { SetUserState } from '../localstorage/states';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DateRangeIcon from '@material-ui/icons/DateRange';

import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    selector: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function LoginForm() {
    const classes = useStyles();

    const [usuario, setUsuario] = useState('');
    const [contra, setContra] = useState('');
    const [show, setShow] = React.useState({
        showPassword: false
    });


    async function checkUserApi(){
        console.log(contra)
        const res = await fetch('/api/login/' + usuario +'/'+contra,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = res['status'];
        if (data == 500 && (usuario == "" || contra == "")){
            document.getElementById('alert-error-login').style.display = "block";
            
        }else{
            document.getElementById('alert-error-login').style.display = "none";
            SetUserState("homelogin", usuario);
            window.location.reload(false);
        }
        
        console.log(data);
    }

    const handleClickShowPassword = () => {
        setShow({ ...show, showPassword: !show.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };



    return (
            <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <AccountCircle />
                </Grid>
                <Grid item>
                    <TextField id="input-with-icon-grid" label="Nombre de usuario" value={usuario} onChange={e => setUsuario(e.target.value)}/>
                </Grid>
            </Grid>
            
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="outlined-adornment-password"
                    type={show.showPassword ? "text" : "password"}
                    value={contra}
                    onChange={e => setContra(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {show.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Button variant="contained" color="primary" onClick={checkUserApi}>Iniciar sesión</Button>
                <div id="alert-error-login">
                    <Alert severity="error">El usuario o la contraseña no son correctos</Alert>
                </div>
            </FormControl>
            
            </div>
    );
}

function RegistroForm() {
    const classes = useStyles();

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [contra, setContra] = React.useState({
        showPassword: false,
    });
    const [genero, setGen] = React.useState('');

    async function RegistrarApi(e) {
        e.preventDefault();
        
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario,
                email,
                fecha,
                contra,
                genero,

            })
        })
        const data = res['status'];
        if (data == 200) {
            document.getElementById('alert-error-regis').style.display = "block";
            document.getElementById('alert-newuser-regis').style.display = "none";
        } else {
            document.getElementById('alert-newuser-regis').style.display = "block";
            document.getElementById('alert-error-regis').style.display = "none";
        }
        console.log(data);
        
    }

    const handleClickShowPassword = () => {
        setContra({ ...contra, showPassword: !contra.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.margin}>
            <form onSubmit={RegistrarApi} className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <AccountCircle />
                </Grid>
                <Grid item>
                    <TextField id="input-with-icon-grid" label="Nombre de usuario" onChange={e => setUsuario(e.target.value)}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <MailOutlineIcon />
                </Grid>
                <Grid item>
                    <TextField type="email" id="input-with-icon-grid" label="Correo Electronico" onChange={e => setEmail(e.target.value)}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <DateRangeIcon />
                </Grid>
                <Grid item>
                    <Input id="Birthday" type="date" className="date-input" onChange={e => setFecha(e.target.value)} required/>
                </Grid>
            </Grid>
            <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={contra.showPassword ? 'text' : 'password'}
                    value={contra.password}
                    onChange={e => setContra(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {contra.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <p className="cuestions-form-regis">¿Que tipo de musica te gusta?</p>
            <FormControl className={classes.selector}>
                <InputLabel id="demo-simple-select-label">Género</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={genero}
                    onChange={e => setGen(e.target.value)}
                >
                    <MenuItem value={"EDM"}>EDM</MenuItem>
                    <MenuItem value={"Dance"}>Dance</MenuItem>
                    <MenuItem value={"House"}>House</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="secondary" >Registrar</Button>
                <div id="alert-error-regis">
                    <Alert severity="error">Esta cuenta ya existe</Alert>
                </div>
                <div id="alert-newuser-regis">
                    <Alert severity="success">El registro se ha realizado correctamente</Alert>
                </div>
            </form>
        </div>
    );
}

export {LoginForm, RegistroForm};