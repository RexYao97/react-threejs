import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Cpt from './cpt/index.jsx';
import Route from './route/index.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './common/less/main.less';
import * as THREE from 'three';
React.$THREE = THREE;

ReactDOM.render(
  <AppContainer>
    <Router>
      <Cpt />
      <Route></Route>
    </Router>
  </AppContainer>,
  document.getElementById('main'),
);
