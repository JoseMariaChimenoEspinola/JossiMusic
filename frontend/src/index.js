import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './App';


ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/api/time"></Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

