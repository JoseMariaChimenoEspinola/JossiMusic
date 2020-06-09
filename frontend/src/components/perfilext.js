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
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

/* Reproductor */
import Start from './reproductor';

import GridList from '@material-ui/core/GridList';

function ProfileUser() {
  //Get id from url
  var [artista, setArtista] = useState("");
  var url = new URLSearchParams(window.location.search);
  setTimeout(() => {
    setArtista(url.get('artist'));
  }, 50);

  //Insert caratula
  const [caratula, setCaratula] = useState("");
  const getAvatar = async () => {
    await fetch('/api/getPerfilPhoto/' + artista, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json()).then(data => setCaratula(data['foto']));
  }
  setTimeout(() => {
    getAvatar();
  }, 100);



  //Insert aditional data
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [genero, setGenero] = useState("");
  const getDataSong = async () => {
    await fetch('/api/getArtistaPorId/' + artista, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json()).then(data => {
      setUsuario(data['usuario']);
      setEmail(data['email']);
      setFecha(data['fecha']);
      setGenero(data['genero']);
    });
  }
  setTimeout(() => {
    getDataSong();
  }, 110);


  //Insertar canciones en perfil
  function setReproductor(id) {
    Start(id);
  }

  var list = new Array;
  const [cancionesSubidas, setCancionesSubidas] = useState(0);
  setTimeout(function () {
    fetch('/api/getMusic/' + artista).then(resp => resp.json()).then(data => {
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

  return (
    <div id="wrapper">
      <section className="content">
        <div className="song-style-container">
          <div className="container-avatar-text">
            <label htmlFor="contained-button-file" className="hoverAvatar"><Avatar alt={localStorage.getItem('usuario')} id="photo-avatar" src={caratula} /></label>
          </div>
          <Divider className="divider-options-song" />
          <div>
            <h1 className="titulo-cancion-detalles">{usuario}</h1>
            <h3>{genero}</h3>
            <h5>{fecha}</h5>
            <h5>{email}</h5>
            <h5>{cancionesSubidas} canciones</h5>
            <br></br>
            <Button variant="contained" color="primary">Seguir</Button>
          </div>
        </div>
        <Divider />
        <div className="profile-style-container">
          <h1>Novedades</h1>
        </div>
        <GridList cols={2.5}>
          <div id="songs-container-author"></div>
        </GridList>
      </section>
    </div>
  );

}


class ArtistEfecto extends React.Component {
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

export { ArtistEfecto };
