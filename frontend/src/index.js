import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home, HomeLogin} from './App';
import FormUploader from './components/uploadfile';
import { GetStateLogin } from './localstorage/states';

function ShowHidePages(){
  let check = GetStateLogin();
  
  if (check == 'homelogin'){
    return <HomeLogin/>;
  }else if(check == 'upload'){
    return <FormUploader/>;
  }else{
    return <Home />;
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

