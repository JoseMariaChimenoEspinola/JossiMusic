import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Switch, Route, withRouter} from 'react-router-dom';
import {Home, HomeLogin} from './App';
import FormUploader from './components/uploadfile';
import { GetStateLogin } from './localstorage/states';
import { PerfilUsuario, ParametrosUsuario} from './components/Perfil';
import PaginaCancion from './components/songpage';



function ShowHidePages() {
  let check = GetStateLogin();

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
      <Route path="/cancion" component={PaginaCancion}></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

