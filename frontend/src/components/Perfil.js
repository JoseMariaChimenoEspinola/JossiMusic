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

/* Reproductor */
import Start from './reproductor';

import GridList from '@material-ui/core/GridList';

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
        data += '<a value="' + list[i]._id + '" class="link-song" id="link-song-' + i + '"><div class="div-contenedor-resultados">';
        data += '<img class="foto-contenedor-resultados" src="' + list[i].dircaratula + '"></img>';
        data += '<p>' + list[i].titulo + '</p>';
        data += '<p>' + list[i].genero + '</p>';
        data += '<p>' + list[i].fecha + '</p>';
        data += '</div></a>';
        document.getElementById('songs-container-author').innerHTML = data;
      }
      for (var i = 0; i < list.length; i++) {
        (function (i) {
          var id = list[i]._id;
          document.getElementById('link-song-' + i).onclick = function () { setReproductor(id) };
        })(i);
      }

    }, 1100)
  }, 0);

  /* avatar perfil */
  setTimeout(function () {
    getAvatar();
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

  return (
    <div id="wrapper">
      <header>
        <MenuHeaderLoginSearch />
      </header>
      <section className="content">
        <div className="conf-container">
          <h1>Configuration</h1>

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
