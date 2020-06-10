import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

/* Formularios internos */
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AOS from 'aos';
import Dropzone from 'react-dropzone';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import { storage } from '../firebase/config';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

/* Menus */
import { MenuHeaderLoginSearch } from './Menu';

/* Dialogs */
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


/* Iconos */
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountCircle from '@material-ui/icons/AccountCircle';

import DateRangeIcon from '@material-ui/icons/DateRange';

/* Reproductor */
import Start from './reproductor';
import GridList from '@material-ui/core/GridList';

/* correo electronico */
import emailjs from 'emailjs-com';

/* alert delete song */
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';


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


function ProfileUser() {


  const [cancionesSubidas, setCancionesSubidas] = useState(0);
  const artista = localStorage.getItem('usuario');
  const [avatar, setAvatar] = useState('');
  const [usuario, setUsuario] = useState('');
  var list = new Array;


  const getAvatar = async () => {
    await fetch('/api/getDataUser/' + artista, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json()).then(data => {
      setAvatar(data['foto']);
      setUsuario(data['usuario']);
    });
  }

  function setReproductor(id) {
    Start(id);
  }

  function deleteSong(id) {
    fetch('/api/deleteSong/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    alert("cancion eliminada");
    document.getElementById('songs-container-author').innerHTML = "";
    refreshSongs();
  }

  function refreshSongs() {
    setTimeout(function () {
      fetch('/api/getMusic/' + localStorage.getItem('usuario')).then(resp => resp.json()).then(data => {
        for (let x of data) {
          list.push(x);
        }
      });

      setTimeout(function () {
        var data = "";
        setCancionesSubidas(list.length);
        for (var i = 0; i < list.length; i++) {
          data += '<div class="div-contenedor-resultados">';
          data += '<a value="' + list[i]._id + '" class="link-song" id="link-song-' + i + '"><img class="foto-contenedor-resultados" src="' + list[i].dircaratula + '"></img>';
          data += '<p>' + list[i].titulo + '</p>';
          data += '<p>' + list[i].genero + '</p>';
          data += '<p>' + list[i].fecha + '</p></a>';
          data += '<a id="button-song-' + i + '" ><Button class="button-songs-delete">Eliminar</Button></a>';
          data += '</div>';
          document.getElementById('songs-container-author').innerHTML = data;
        }
        for (var i = 0; i < list.length; i++) {
          (function (i) {
            var id = list[i]._id;
            document.getElementById('link-song-' + i).onclick = function () { setReproductor(id) };
          })(i);
        }
        for (var i = 0; i < list.length; i++) {
          (function (i) {
            var id = list[i]._id;
            document.getElementById('button-song-' + i).onclick = function () { deleteSong(id) };
          })(i);
        }
      }, 1100)
    }, 0);
  }

  /* avatar perfil */
  setTimeout(function () {
    getAvatar();
    refreshSongs();
  }, 0);

  
  return (
    <div id="wrapper">
      <section className="content">
        <div className="profile-style-container">
          <div className="container-avatar-text">
            <label htmlFor="contained-button-file" className="hoverAvatar"><Avatar alt={localStorage.getItem('usuario')} id="photo-avatar" src={avatar} /></label>
            <h5>{usuario}</h5>
            <h6>DJs</h6>
          </div>
          <div className="container-subs-counter">
            <h4>{cancionesSubidas}<br></br> Canciones</h4>
            <h4>0<br></br> Seguidores</h4>
            <h4>0<br></br> Seguidos</h4>
          </div>
        </div>
        <Divider />
        <div className="profile-style-container">
          <h1>Ultimas subidas</h1>
        </div>
        <GridList cols={2.5}>
          <div id="songs-container-author"></div>
        </GridList>
      </section>
    </div>
  );
}

function Configuration() {
  const classes = useStyles();
  let usuario = localStorage.getItem('usuario');

  /* Cambio de contraseña */
  const [oldPassword, setOldPassword] = useState('');
  const [conf, setConf] = useState('');
  const [showOldPass, setShowOldPass] = React.useState({
    showPassword: false
  });

  const handleClickShowPasswordOld = () => {
    setShowOldPass({ ...showOldPass, showPassword: !showOldPass.showPassword });
  };

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
    CheckPassword();
  }

  async function CheckPassword() {
    var conf;

    await fetch('/api/checkOldPassoword/' + usuario + '/' + oldPassword, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.text()).then(data => conf = data)

    if (conf == 'False') {
      setConf(true);
    } else {
      setConf(false);
    }

  }

  const [newPassword, setNewPassword] = useState('');
  const [showNewPass, setShowNewPass] = React.useState({
    showPassword: false
  });

  const handleClickShowPasswordNew = () => {
    setShowNewPass({ ...showNewPass, showPassword: !showNewPass.showPassword });
  };

  const [newPassword2, setNewPassword2] = useState('');
  const [showNewPass2, setShowNewPass2] = React.useState({
    showPassword: false
  });

  const handleClickShowPasswordNew2 = () => {
    setShowNewPass2({ ...showNewPass2, showPassword: !showNewPass2.showPassword });
  };



  // Change password
  async function changePassword(event) {
    event.preventDefault();

    var check;

    if (conf == false && oldPassword != '') {
      if (newPassword.match(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g) && newPassword2.match(/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g) && newPassword == newPassword2) {
        await fetch('/api/changePassword/' + usuario, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            newPassword,
            newPassword2
          })
        })
        check = true;
      } else {
        check = false;
      }

      if (check == false) {
        document.getElementById('alert-errorpass-regis').style.display = "block";
        document.getElementById('alert-updatepass-regis').style.display = "none";
        document.getElementById('alert-erroroldpass-regis').style.display = "none";
        setTimeout(() => { document.getElementById('alert-errorpass-regis').style.display = 'none' }, 5000);
      } else {
        document.getElementById('alert-updatepass-regis').style.display = "block";
        document.getElementById('alert-errorpass-regis').style.display = "none";
        document.getElementById('alert-erroroldpass-regis').style.display = "none";
        setTimeout(() => { document.getElementById('alert-updatepass-regis').style.display = 'none' }, 3000);
      }
    } else {
      document.getElementById('alert-erroroldpass-regis').style.display = "block";
      document.getElementById('alert-updatepass-regis').style.display = "none";
      document.getElementById('alert-errorpass-regis').style.display = "none";
      setTimeout(() => { document.getElementById('alert-erroroldpass-regis').style.display = 'none' }, 5000);
    }
  }


  const handleMouseDownPassword = event => {
    event.preventDefault();
  };



  /* Definir estilo */
  const [genero, setGen] = React.useState('');

  // comprueba el genero actual
  let gen;
  function checkGen() {
    fetch('/api/checkStyleMusic/' + usuario).then(resp => resp.json()).then(data => gen = data['genero']);
    setTimeout(() => {
      document.getElementById('actual-gen').innerHTML = 'La seleccion actual es: <span class="bold-gen-style">' + gen + '</span>';
    }, 500);
  }

  useEffect(() => {
    setTimeout(() => {
      checkGen();
    }, 0);
  }, []);


  async function UpdateStyle() {

    var conf;

    await fetch('/api/changeStyle/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario,
        genero
      })
    }).then(resp => resp.text()).then(data => conf = data)

    if (conf == 'False') {
      document.getElementById('alert-errorstyle-regis').style.display = "block";
      document.getElementById('alert-updatestyle-regis').style.display = "none";
    } else {
      document.getElementById('alert-updatestyle-regis').style.display = "block";
      document.getElementById('alert-errorstyle-regis').style.display = "none";
      setTimeout(() => { document.getElementById('alert-updatestyle-regis').style.display = 'none' }, 1000);
      checkGen();
    }


  }


  /* Foto de perfil y datos adicionales */
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [dataUser, setDataUser] = useState([]);
  const artistaID = localStorage.getItem('usuario');

  function getDataUser() {
    fetch('/api/getDataUser/' + artistaID, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.text()).then(data => setDataUser(JSON.parse(data)));
  }

  setTimeout(() => {
    getDataUser()
  }, 200);


  /* Cambios de usuario */
  const [photo, setPhoto] = useState("");
  const [urlPhoto, setUrlPhoto] = useState('');
  const [progrescarat, setProgressCarat] = useState(0);

  function handlePhoto(event) {
    var file = event.target.files[0];
    setPhoto(file);
    var namefile = String(file.name);
    var typefile = String(file.type);
    var blob = new Blob([file], { type: typefile });//convierto el archivo a un blob con el tipo de archivo dinamicamente.

    const uploadFoto = storage.ref(`fotosperfil/${namefile}`).put(blob);
    uploadFoto.on(
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
    console.log(urlPhoto);
  }
  function resetPhoto() {
    setPhoto('');
    var namefile = String(photo.name);
    storage.ref(`songs/${namefile}`).delete();
    setProgressCarat(0);
  }

  async function handleDataUser(event) {
    event.preventDefault();

    var check;

    await fetch('/api/updateDataUser/' + localStorage.getItem('usuario'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user,
        email,
        urlPhoto
      })
    }).then(resp => resp.text()).then(data => check = data);

    document.getElementById('alert-newuser-regis').style.display = "block";

    sendEmail(user, email);
  }


  return (
    <div id="wrapper">
      <header>
        <MenuHeaderLoginSearch />
      </header>
      <section className="content">
        <div className="conf-container">
          <h1>Configuration</h1>
          <div className="forms-options">
            <form onSubmit={handleDataUser}>
              <h5>Selecciona una nueva imagen:</h5>

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


              <div className={clsx(classes.container)}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField id="input-with-icon-grid" label={dataUser['usuario']} onChange={e => setUser(e.target.value)} required />
                  </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <MailOutlineIcon />
                  </Grid>
                  <Grid item>
                    <TextField type="email" id="input-with-icon-grid" label={dataUser['email']} onChange={e => setEmail(e.target.value)} required />
                  </Grid>
                </Grid>
              </div>
              <Button type="submit" variant="contained" color="secondary" disabled={progrescarat == 100 ? false : true}>Guardar Cambios</Button>
              <div id="alert-newuser-regis">
                <Alert severity="success">Modificación confirmada</Alert>
              </div>
            </form>
          </div>

          <Divider />

          <div className="container-options">
            <div className="container-option-div">
              <h3>Cambio de contraseña</h3>
              <p>Completa el siguiente formulario para poder realizar el cambio de contraseña</p>
              <div className="forms-options">
                <FormControl className="input-password-changes">
                  <InputLabel htmlFor="standard-adornment-password">Contraseña antigua:</InputLabel>
                  <Input
                    id="outlined-old-password"
                    type={showOldPass.showPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={handleOldPassword}
                    error={conf == '' ? false : true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordOld}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showOldPass.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <form className="forms-options" onSubmit={changePassword}>
                  <FormControl className="input-password-changes">
                    <InputLabel htmlFor="standard-adornment-password">Contraseña Nueva:</InputLabel>
                    <Input
                      id="outlined-new-password"
                      type={showNewPass.showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordNew}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showNewPass.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <FormControl className="input-password-changes">
                    <InputLabel htmlFor="standard-adornment-password">Confirmar contraseña:</InputLabel>
                    <Input
                      id="outlined-newrep-password"
                      type={showNewPass2.showPassword ? "text" : "password"}
                      value={newPassword2}
                      onChange={e => setNewPassword2(e.target.value)}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPasswordNew2}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showNewPass2.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <Button variant="contained" color="primary" className="button-submit-options" type="submit">Cambiar contraseña</Button>
                  <div id="alert-updatepass-regis">
                    <Alert severity="success">Se ha modificado correctamente la contraseña</Alert>
                  </div>
                  <div id="alert-errorpass-regis">
                    <Alert severity="error">La contraseña no coincide o no cumple la politica de contraseña</Alert>
                  </div>
                  <div id="alert-erroroldpass-regis">
                    <Alert severity="error">La contraseña antigua no es correcta</Alert>
                  </div>
                </form>
                <RulesChange />
              </div>
            </div>

            <Divider className="divider-options-conf" />

            <div className="container-option-div">
              <h3>Estilo de musica</h3>
              <p>Selecciona aqui el estilo de musica que te gustaria ver en el inicio:</p>
              <p id="actual-gen"></p>
              <div className="select-option-musicstyle">
                <InputLabel id="demo-simple-select-label">Género</InputLabel>
                <Select
                  labelId="select-genero"
                  id="select-genero"
                  value={genero}
                  onChange={e => setGen(e.target.value)}
                  className="select-option-musicstyle"
                >
                  <MenuItem value={"EDM"}>EDM</MenuItem>
                  <MenuItem value={"Dance"}>Dance</MenuItem>
                  <MenuItem value={"House"}>House</MenuItem>
                </Select>
                <Button variant="contained" color="primary" className="button-submit-options" onClick={UpdateStyle}>Cambiar estilo</Button>
                <div id="alert-updatestyle-regis">
                  <Alert severity="success">Se ha modificado correctamente el estilo predefinido</Alert>
                </div>
                <div id="alert-errorstyle-regis">
                  <Alert severity="error">No se ha seleccionado ningun estilo en el selector</Alert>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}




// Politica de contraseñas

function RulesChange() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ width: "90%", borderRadius: "15px", margin: "10px" }}>Politica de contraseñas</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Politica de contraseña de documentos"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La contraseña introducida debe de cumplir los siguientes requisitos:
            </DialogContentText>
          <ul style={{ textAlign: "center", listStyle: "none" }}>
            <li>Longitud minima de 8 caracteres a 12 maximo</li>
            <li>Una letra Mayuscula</li>
            <li>Una letra minuscula</li>
            <li>Un carater especial  (!@#$%^*_=+-&)</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus style={{ width: "100%" }}>
            Cerrar
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/* correo electronico */
function sendEmail(user, email) {
  var templateParams = {
    to_name: email,
    usuario: user
  }
  emailjs.send('gmail', 'changedata', templateParams, 'user_yyMozYnxNs5GlhgdMmqDp')
    .then((result) => {
      console.log(result.text);
    }, (error) => {
      console.log(error.text);
    });
}


//Efectos de entrada y salida

class ParametrosUsuario extends React.Component {
  constructor(props, context) {
    super(props, context);
    AOS.init({
      duration: 1200,
    });
  }
  componentWillReceiveProps() {
    AOS.refresh();
  }

  render() {
    return (
      <div>
        <header>
          <MenuHeaderLoginSearch />
        </header>
        <div data-aos="fade-down">
          <Configuration />
        </div>
      </div>
    );
  }
}

class PerfilUsuario extends React.Component {
  constructor(props, context) {
    super(props, context);
    AOS.init({
      duration: 1200,
    });
  }
  componentWillReceiveProps() {
    AOS.refresh();
  }

  render() {
    return (
      <div>
        <header>
          <MenuHeaderLoginSearch />
        </header>
        <div data-aos="fade-down">
          <ProfileUser />
        </div>
      </div>
    );
  }
}

export { PerfilUsuario, ParametrosUsuario };
