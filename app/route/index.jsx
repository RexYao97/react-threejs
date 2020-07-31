import React from 'react';

import { Route } from 'react-router-dom';
// import Func from '../modules/funcdom/index.jsx';
import routeConfig from './route';
// import Home from '../modules/home/index.jsx';
class MyRoute extends React.Component {
  getRoutes(routeConfig) {
    const dom = [];

    for (const value of routeConfig) {
      const Component = value.component;
      if (value.path === '/') {
        dom.push(
          <Route
            className="contain"
            component={Component}
            exact
            key={value.name}
            path={value.path}
          ></Route>,
        );
      } else {
        dom.push(
          <Route
            className="contain"
            component={Component}
            key={value.name}
            path={value.path}
          ></Route>,
        );
      }
    }

    return dom;
  }

  render() {
    return this.getRoutes(routeConfig);
  }
}
export default MyRoute;
