import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import { Home, HomeLogin } from './App';
import FormUploader from './components/uploadfile';
import { GetStateLogin } from './localstorage/states';
import { PerfilUsuario, ParametrosUsuario } from './components/Perfil';
import {CancionEfecto} from './components/cancion';
import { ArtistEfecto } from './components/perfilext';
import Start from './components/reproductor';


import { politicadeprovacidad, localstorage} from './politicas/politicaPri';

var check = GetStateLogin();

function ShowHidePages() {
  if (check == 'homelogin') {
    return <HomeLogin />;
  } else {
    return <Home />;
  }
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={ShowHidePages}></Route>
      <Route path="/uploadcontent" component={FormUploader}></Route>
      <Route path="/perfil" component={PerfilUsuario}></Route>
      <Route path="/configuration" component={ParametrosUsuario}></Route>
      <Route path="/cancion" component={CancionEfecto}></Route>
      <Route path="/perfilext" component={ArtistEfecto}></Route>
      <Route path="/politicadeprivacidad" component={politicadeprovacidad}></Route>
      <Route path="/localstorage" component={localstorage}></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

export default function ShowHideReproductor() {

  var check = GetStateLogin();

  if (check == 'homelogin') {
    document.getElementById('media').style.display = "fixed";
  } else {
    document.getElementById('media').style.display = "none";
  }
  return '';
}

ReactDOM.render(
  <div>
    <ShowHideReproductor />
    <Start/>
  </div>,
  document.getElementById('media')
);
