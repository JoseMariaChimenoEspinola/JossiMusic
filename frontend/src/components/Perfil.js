import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


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


import { MenuHeaderLoginSearch } from './Menu';

/* Iconos */
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailOutlineIcon from '@material-ui/icons/MailOutline';


function ProfileUser() {
  var artista = localStorage.getItem('usuario');

  var [songs, setSongs] = useState('');

  const checkUserApi = async () => {
    const res = await fetch('/api/getMusic/' + artista).then(resp => setSongs(resp));
    return res;
  }

  useEffect(() => {
    var rest = checkUserApi();

  });


  const likes = 0;
  var subs = 0;

  async function addLike() {
    likes = likes + 1;
  }

  return (
    <div id="wrapper">
      <section className="content">
        <div className="profile-style-container">
          <div className="container-likes-counter">
            <h1>{likes} Likes</h1>
            <ThumbUpIcon id="like" onClick={addLike} />
          </div>
          <div className="container-avatar-text">
            <input
              accept="image/*"
              id="contained-button-file"
              className="hideInput"
              type="file"
            />
            <label htmlFor="contained-button-file"><Avatar alt={localStorage.getItem('usuario')} className="hoverAvatar" /></label>
            <h5>{localStorage.getItem('usuario')}</h5>
            <h6>DJs</h6>
          </div>
          <div className="container-subs-counter">
            <h1>{subs} seguidores</h1>
            <Button variant="contained" color="primary">
              Seguir
              </Button>
          </div>
        </div>
        <div className="profile-style-container">
          <h1>Ultimas subidas</h1>

        </div>
      </section>
    </div>
  );
}

function Configuration() {
  /* Cambio de contraseña */

  const [oldPassword, setOldPassword] = useState('');
  const [showOldPass, setShowOldPass] = React.useState({
    showPassword: false
  });

  const handleClickShowPasswordOld = () => {
    setShowOldPass({ ...showOldPass, showPassword: !showOldPass.showPassword });
  };


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

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  /* Notificaciones */
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [email, setEmail] = useState('');

  /* Definir estilo */
  const [genero, setGen] = React.useState('');
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
              <form className="forms-options">

                <FormControl className="input-password-changes">
                  <InputLabel htmlFor="standard-adornment-password">Contraseña antigua:</InputLabel>
                  <Input
                    id="outlined-adornment-password"
                    type={showOldPass.showPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
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

                <FormControl className="input-password-changes">
                  <InputLabel htmlFor="standard-adornment-password">Contraseña Nueva:</InputLabel>
                  <Input
                    id="outlined-adornment-password"
                    type={showNewPass.showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
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
                    id="outlined-adornment-password"
                    type={showNewPass2.showPassword ? "text" : "password"}
                    value={newPassword2}
                    onChange={e => setNewPassword2(e.target.value)}
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
                <Button variant="contained" color="primary" className="button-submit-options">Cambiar contraseña</Button>
              </form>
            </div>

            <Divider className="divider-options-conf" />

            <div className="container-option-div">
              <h3>Notificaciones</h3>
              <div className="option-check-container">
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                /><label htmlFor="">Inicio de sesion</label>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                /><label htmlFor="">Cambio de contraseña</label>
              </div>
              <h4>Newsletter</h4>
              <p>Introduce tu correo electronico para poder verificar que deseas recibir publicidad de la plataforma:</p>

              <form>
                <Grid container spacing={1} alignItems="flex-end" className="input-mail-newsletter-options">
                  <Grid item>
                    <MailOutlineIcon />
                  </Grid>
                  <Grid item>
                    <TextField type="email" id="input-with-icon-grid" label="Correo Electronico" onChange={e => setEmail(e.target.value)} />
                  </Grid>
                </Grid>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                /><label htmlFor="">He leido y acepto la Politica de Privacidad</label>
                <Button variant="contained" color="primary" className="button-submit-options">Suscribete a Newsletter</Button>
              </form>
            </div>

            <Divider className="divider-options-conf" />

            <div className="container-option-div">
              <h3>Estilo de musica</h3>
              <p>Selecciona aqui el estilo de musica que te gustaria ver en el inicio:</p>
              <p>La seleccion actual es: </p>
              <div className="select-option-musicstyle">
                <InputLabel id="demo-simple-select-label">Género</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={genero}
                  onChange={e => setGen(e.target.value)}
                  className="select-option-musicstyle"
                >
                  <MenuItem value={"EDM"}>EDM</MenuItem>
                  <MenuItem value={"Dance"}>Dance</MenuItem>
                  <MenuItem value={"House"}>House</MenuItem>
                </Select>
                <Button variant="contained" color="primary" className="button-submit-options">Cambiar estilo</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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
