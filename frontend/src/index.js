import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home, HomeLogin} from './App';
import { GetCookie } from './cookies/cookies';

function ShowHidePages(){
  let check = GetCookie();
  
  if(check == 'true'){
    return <HomeLogin/>;
  }else{
    return <Home/>;
  }

  return <Home/>;
}

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/" component={ShowHidePages}></Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

