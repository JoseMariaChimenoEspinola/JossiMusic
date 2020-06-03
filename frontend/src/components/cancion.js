import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

/* Formularios internos */
import Divider from '@material-ui/core/Divider';
import AOS from 'aos';

/* Menus */
import { MenuHeaderLoginSearch } from './Menu';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

/* Reproductor */
import Start from './reproductor';
import GridList from '@material-ui/core/GridList';

/* Comentarios */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function ProfileUser() {
  //Get id from url
  var [cancion, setCancion] = useState("");
  var url = new URLSearchParams(window.location.search);
  setTimeout(() => {
    setCancion(url.get('song'));
  }, 50);

  //Insert caratula
  const [caratula, setCaratula] = useState("");
  const getAvatar = async () => {
    await fetch('/api/getCaratulaPhoto/' + cancion, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json()).then(data => setCaratula(data['dircaratula']));
  }
  setTimeout(() => {
    getAvatar();
  }, 100);

  //Insert aditional data
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [genero, setGenero] = useState("");
  const getDataSong = async () => {
    await fetch('/api/getCancionPorId/' + cancion, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json()).then(data => {
      setTitulo(data['titulo']);

      fetch('/api/getDataUser/' + data['artista'], {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(resp => resp.json()).then(data => {
        setArtista(data['usuario'])
      });
      setGenero(data['genero']);
    });
  }
  setTimeout(() => {
    getDataSong();
  }, 110);

  /*Comentarios*/
  const [value, setValue] = React.useState(0);

  return (
    <div id="wrapper">
      <section className="content">
        <div className="song-style-container">
          <div className="container-avatar-text">
            <label htmlFor="contained-button-file" className="hoverAvatar"><Avatar alt={localStorage.getItem('usuario')} id="photo-avatar" src={caratula} /></label>
          </div>
          <Divider className="divider-options-song" />
          <div>
            <h1 className="titulo-cancion-detalles">{titulo}</h1>
            <h3>{artista}</h3>
            <h5>{genero}</h5>
            <br></br>
            <Button variant="contained" onClick={function () { Start(cancion) }}><PlayCircleFilledIcon /></Button>
          </div>
          <Divider className="divider-options-song" />
          <div>
            <h4>0<br></br> Reproducciones</h4>
            <h4>0<br></br> Likes</h4>
            <Button variant="contained" color="primary" className="like-button"><ThumbUpAltIcon/></Button>
          </div>
        </div>
        <Divider />
        <div className="profile-style-container">
          <div className="container-comentarios">
            <h1>Comentarios</h1>
            <div className="formulario-comentarios">
              <TextareaAutosize aria-label="Escribe tu comentario aquí" rowsMin={5} className="textarea-comentarios" placeholder="Escribe tu comentario aquí" />

              <div className="subir-comentario">
                <Box component="fieldset" mb={3} borderColor="transparent">
                  <Typography component="legend">Puntuación: </Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <Button variant="contained" color="primary" className="button-upload-comment">Crear</Button>
              </div>

            </div>
            <Divider />
            <List className="listaComentarios">
              <ListItem>
                <ListItemAvatar>
                  <Avatar className="avatar-coments" src={caratula} />
                </ListItemAvatar>
                <ListItemText primary="Josechu" secondary="Bacon ipsum dolor amet corned beef ground round swine turducken pork pastrami chicken spare ribs fatback. Pancetta brisket pork belly sausage biltong. Spare ribs burgdoggen t-bone pork loin picanha. Sausage pastrami rump beef drumstick jerky. Pork belly chuck corned beef, landjaeger pancetta pastrami capicola salami. Ribeye shankle burgdoggen beef ribs buffalo pork pig. Burgdoggen short ribs frankfurter cupim shoulder." />
              </ListItem>
            </List>
          </div>
        </div>
      </section>
    </div>
  );

}


class CancionEfecto extends React.Component {
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

export { CancionEfecto };
