import React, { useState } from 'react';
import { SetUserState } from '../localstorage/states';
import Dropzone from 'react-dropzone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CircularProgress from '@material-ui/core/CircularProgress';

import { storage } from '../firebase/config';

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

/* correo electronico */
import emailjs from 'emailjs-com';

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
        justifyContent: "space-around"
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
    root: {
        position: "absolute",
        top: "130px",
        left: "300px",
        right: "300px",
        border: "1px solid grey",
        borderRadius: "15px",
        padding: "65px",
        display: "flex",
        justifyContent: "space-around"
    },
    titulo: {
        paddingTop: "75px",
        textAlign: "center"
    },
    media: {
        width: "45%"
    },
    form: {
        width: "55%!important",
        display: "flex",
        alignItems: "unsafe",
        flexDirection: "column"
    },
    dropzone: {
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
        border: "3px dashed #eeeeee",
        backgroundColor: "#fafafa",
        color: "",
        marginBottom: "5px",
        "&:hover": {
            cursor: "pointer"
        },
        "&:focus": {
            outline: 0
        },
        height: "120px",
        width: "100%"
    },
    textRedUpload: {
        color: "red"
    },
    textGreenUpload: {
        color: "green"
    },
    containerPreview: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "120px"
    },
    caratulaPreview: {
        width: "100px",
        borderRadius: "100%"
    },
    closeIcon: {
        marginTop: "20px",
        transition: "0.3s all",
        "&:hover": {
            color: "red",
            cursor: "pointer",
            transition: "0.3s all"
        }
    },
    container: {
        width: "100% !important"
    }
}));


function LoginForm() {
    const classes = useStyles();

    const [usuario, setUsuario] = useState('');
    const [contra, setContra] = useState('');
    const [show, setShow] = React.useState({
        showPassword: false
    });


    async function checkUserApi() {

        const res = await fetch('/api/login/' + usuario + '/' + contra, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json()).then(data => {
            return data;
        }).catch(function () {
            document.getElementById('alert-error-login').style.display = "block";
            setTimeout(() => { document.getElementById('alert-error-login').style.display = 'none' }, 3000);
        });

        if (res != null) {
            document.getElementById('alert-error-login').style.display = "none";
            SetUserState("homelogin", res['_id']);
            window.location.reload(false);
        } else {
            document.getElementById('alert-error-login').style.display = "block";
            setTimeout(() => { document.getElementById('alert-error-login').style.display = 'none' }, 3000);
        }

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
                    <TextField id="input-with-icon-grid" label="Nombre de usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
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

    const [photo, setPhoto] = useState("");
    const [urlPhoto, setUrlPhoto] = useState('');
    const [progrescarat, setProgressCarat] = useState(0);

    function handlePhoto(event) {
        var file = event.target.files[0];
        setPhoto(file);
        var namefile = String(file.name);
        var typefile = String(file.type);
        var blob = new Blob([file], { type: typefile });//convierto el archivo a un blob con el tipo de archivo dinamicamente.

        const uploadSong = storage.ref(`fotosperfil/${namefile}`).put(blob);
        uploadSong.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgressCarat(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage.ref("fotosperfil").child(namefile).getDownloadURL().then(url => { setUrlPhoto(url); });
            }
        );
        
    }

    function resetPhoto() {
        setPhoto('');
        var namefile = String(photo.name);
        storage.ref(`songs/${namefile}`).delete();
        setProgressCarat(0);
    }


    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [contra, setContra] = React.useState({
        showPassword: false,
    });
    const [genero, setGen] = React.useState('');

    async function RegistrarApi(e) {
        e.preventDefault();

        var check;   
    

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
                urlPhoto
            })
        }).then(resp => resp.text()).then(data => check = data);

        if (check != 'True') {
            document.getElementById('alert-error-regis').style.display = "block";
            document.getElementById('alert-newuser-regis').style.display = "none";
        } else {
            document.getElementById('alert-newuser-regis').style.display = "block";
            document.getElementById('alert-error-regis').style.display = "none";
            //envia el correo electronico de nueva cuenta
            sendEmail(usuario, email);
        }
        
    }

    const handleClickShowPassword = () => {
        setContra({ ...contra, showPassword: !contra.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.margin}>
            <div className={clsx(classes.container)}>
                {photo == '' ? <Dropzone for="input-file">
                    {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                        <div {...getRootProps({ className: "dropzone" })} className={classes.dropzone}>
                            <input {...getInputProps()} onChange={handlePhoto} accept="image/*" />
                            {photo == '' ? <p>Haz click a este contenedor para poder subir una Foto.<br></br></p> :
                                <div className={classes.containerPreview}>
                                    <p>{photo.name}</p>
                                    <img src={urlPhoto} className={classes.caratulaPreview}></img>
                                    {progrescarat == 100 ? <HighlightOffIcon onClick={resetPhoto} className={classes.closeIcon} /> : <CircularProgress className={classes.closeIcon} value={progrescarat} max="100" />}
                                </div>}
                            {isDragActive && !isDragReject && <p className={classes.textGreenUpload}>Archivo compatible, sueltalo para poder subir este archivo</p>}
                            {isDragReject && <p className={classes.textRedUpload}>El archivo no es compatible con este campo. (ej: .jpg, )</p>}
                        </div>
                    )}
                </Dropzone> : <div className={classes.containerPreview}>
                        <img src={urlPhoto} className={classes.caratulaPreview}></img>
                        {progrescarat == 100 ? <HighlightOffIcon onClick={resetPhoto} className={classes.closeIcon} /> : <CircularProgress className={classes.closeIcon} value={progrescarat} max="100" />}
                    </div>}
            </div>
            <form onSubmit={RegistrarApi} className={classes.margin}>
                <div className={clsx(classes.container)}>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Nombre de usuario" onChange={e => setUsuario(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <MailOutlineIcon />
                    </Grid>
                    <Grid item>
                        <TextField type="email" id="input-with-icon-grid" label="Correo Electronico" onChange={e => setEmail(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <DateRangeIcon />
                    </Grid>
                    <Grid item>
                        <Input id="Birthday" type="date" className="date-input" onChange={e => setFecha(e.target.value)} required />
                    </Grid>
                </Grid>
                </div>
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
                <Button type="submit" variant="contained" color="secondary">Registrar</Button>
                <div id="alert-error-regis">
                    <Alert severity="error">Esta cuenta ya existe</Alert>
                </div>
                <div id="alert-newuser-regis">
                    <Alert severity="success">Registro completado</Alert>
                </div>
            </form>
        </div>
    );
}



function ResetContarseña() {
    const classes = useStyles();

    
    const [email, setEmail] = useState('');
    var check;

    async function RegistrarApi(e) {
        e.preventDefault();

        await fetch('/api/resetPassword/' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.text()).then(data => check = data);

        if (check != 'True') {
            document.getElementById('alert-error-reset').style.display = "block";
            document.getElementById('alert-newuser-reset').style.display = "none";
        } else {
            document.getElementById('alert-newuser-reset').style.display = "block";
            document.getElementById('alert-error-reset').style.display = "none";
        }

    }


    return (
        <div className={classes.margin}>
            <form onSubmit={RegistrarApi} className={classes.margin}>
                <div className={clsx(classes.container)}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <MailOutlineIcon />
                        </Grid>
                        <Grid item>
                            <TextField type="email" id="input-with-icon-grid" label="Correo Electronico" onChange={e => setEmail(e.target.value)} />
                        </Grid>
                    </Grid>
                </div>
                <Button type="submit" variant="contained" color="secondary" >Enviar Petición</Button>
                <div id="alert-error-reset">
                    <Alert severity="error">Esta cuenta no existe</Alert>
                </div>
                <div id="alert-newuser-reset">
                    <Alert severity="success">Se ha enviado tu petición</Alert>
                </div>
            </form>
        </div>
    );
}

/* correo de registro */
function sendEmail(usuario, email) {
    var templateParams = {
        to_name: email,
        usuario: usuario
    }
    emailjs.send('gmail', 'template_TwxrwEs5', templateParams, 'user_yyMozYnxNs5GlhgdMmqDp')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
}



export { LoginForm, RegistroForm, ResetContarseña };