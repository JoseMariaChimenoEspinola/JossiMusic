import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server'
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

/* BackDrop */
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { NavLink } from 'react-router-dom';


function ProfileUser() {
  const [open, setOpen] = React.useState(true);

  const controller = new AbortController()
  const signal = controller.signal

  //Get id from url
  const url = new URLSearchParams(window.location.search);
  var cancion = (url.get('song'));

  //Insert caratula
  const [caratula, setCaratula] = useState("");
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [artistaID, setArtistaID] = useState("");
  const [genero, setGenero] = useState("");
  const [desc, setDesc] = useState("");

  const [numComentarios, setNumComments] = React.useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {

    const cleaner = setTimeout(() => {


      fetch('/api/getCaratulaPhoto/' + cancion, {
        method: 'GET',
        signal: signal,
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(resp => resp.json()).then(data => { setCaratula(data['dircaratula']); return true; }).catch(() => { return false; });


      setTimeout(() =>

        fetch('/api/getCancionPorId/' + cancion, {
          method: 'GET',
          signal: signal,
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(resp => resp.json()).then(data => {
          setTitulo(data['titulo']);
          setArtistaID(data['artista']);
          fetch('/api/getDataUser/' + data['artista'], {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(resp => resp.json()).then(data => {
            setArtista(data['usuario'])
            return true;
          }).catch(() => { return false; });
          setGenero(data['genero']);
          setDesc(data['descripcion']);

        }), 0);




      setTimeout(() => {

        fetch('/api/getCommentsSongs/' + cancion, {
          method: 'GET',
          signal: signal,
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(resp => resp.json()).then(data => {
          setComments(data[0]['comentarios'])
          setNumComments(Object.keys(data[0]['comentarios']).length)
          return true;
        }).catch(() => { return false; });

      }, 0);


    }, 100);



    return () => clearTimeout(cleaner);
  }, []);

  setTimeout(() => {
    setOpen(false);
  }, 800);


  /*Crear comentarios*/
  const [comentario, setComentario] = useState("");
  const [ranking, setRanking] = useState(0);

  function handleInfo(event) {
    event.preventDefault();

    fetch('/api/getDataUser/' + localStorage.getItem('usuario'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(resp => resp.json()).then(data => {

      var usuario = data['usuario'];
      var foto = data['foto'];

      fetch('/api/crearComentario/' + cancion + '/' + numComentarios, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario,
          foto,
          comentario,
          ranking
        })
      }).then(resp => resp.json()).then(data => {
        setComments(data[0]['comentarios'])
        setNumComments(Object.keys(data[0]['comentarios']).length)
        return true;
      }).catch(() => { return false; });

      console.log(comments);

    });

  }

  /* Actualizar comentarios y mostrar */
  function write() {
    let rows = [];

    if (Object.keys(comments).length != 0) {

      comments.map(value => {
        rows.push(renderToString(<div>
          <List>
            <ListItem className="comment-listitem">
              <ListItemAvatar className="text-aling-mobile">
                <Avatar className="avatar-coments" src={value['foto']} />
              </ListItemAvatar>
              <ListItemText primary={value['usuario']} secondary={value['texto']}  className="text-aling-mobile"/>
              <Rating
                value={value['puntuación']}
                readOnly
                className="text-aling-mobile"
              />
            </ListItem>
          </List>
        </div>));
      })
      setNumComments(comments.length);
      document.getElementById('comments').innerHTML = rows.join("");
    } else {
      document.getElementById('comments').innerHTML = "<h3 class='no-comments-songs'>Aun no hay comentarios en esta canción</h3>"
    }


  }



  setTimeout(() => {
    write();
  }, 0);


  return (
    <div>
      <Backdrop open={open} className="backdrop">
        <CircularProgress color="inherit" />
      </Backdrop>
      <div id="wrapper">

        <section className="content">
          <div className="song-style-container">
            <div className="container-avatar-text">
              <label htmlFor="contained-button-file" className="hoverAvatar"><Avatar alt={localStorage.getItem('usuario')} id="photo-avatar" src={caratula} /></label>
            </div>
            <Divider className="divider-options-song divider-phone-conf" />
            <div>
              <h1 className="titulo-cancion-detalles">{titulo}</h1>
              <NavLink to={"/perfilext?artist=" + artistaID}><h3>{artista}</h3></NavLink>
              <h5>{genero}</h5>
              <br></br>
              <Button variant="contained" onClick={function () { Start(cancion) }}><PlayCircleFilledIcon /></Button>
            </div>

          </div>
          <Divider />
          <div className="profile-style-container">
            <div className="container-comentarios">
              <h1>Descripción</h1>
              <p>{desc}</p>
              <h2>Comentarios</h2>
              <form className="formulario-comentarios" onSubmit={handleInfo}>
                <TextareaAutosize aria-label="Escribe tu comentario aquí" rowsMin={5} className="textarea-comentarios" placeholder="Escribe tu comentario aquí" value={comentario} onChange={e => setComentario(e.target.value)} required />

                <div className="subir-comentario">
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend">Puntuación: </Typography>
                    <Rating
                      name="simple-controlled"
                      value={ranking}
                      onChange={e => setRanking(e.target.value)}
                    />
                  </Box>
                  <Button variant="contained" color="primary" className="button-upload-comment" type="submit">Crear</Button>
                </div>

              </form>
              <Divider />
              <List className="listaComentarios">

                <h3>{numComentarios} Comentarios</h3>

                <div id="comments">
                </div>

              </List>
            </div>
          </div>
        </section>
      </div>
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
