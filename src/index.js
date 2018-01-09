import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Styles Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

import Login from './views/Login/'
import axios from 'axios'

if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port
    ? ':' + window.location.port
    : '')
}
axios.defaults.baseURL = window.location.origin + '/api'
let accessToken = localStorage.getItem('Authorization')
if (accessToken) {
  axios.defaults.headers.common['Authorization'] = accessToken
}

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/login" name="Login" component={Login}/>
      <Route path="/" name="Home" component={Full}/>
    </Switch>
  </HashRouter>
), document.getElementById('root'));
