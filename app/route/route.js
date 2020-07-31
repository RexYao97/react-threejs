// import FuncDom from '../modules/funcdom/index.jsx';
// import React from 'react';
import Aniamtion from '../modules/animation/index.jsx';
import Home from '../modules/home/index.jsx';
import Example1 from '../modules/example1/index.jsx';
import Textures from '../modules/textform/index.jsx';
import shaderTop from '../modules/shaderTop/index.jsx';
import shaderTop2 from '../modules/shaderTop2/index.jsx';
import explore from '../modules/shaderTop3-explore/index.jsx';

export default [
  {
    name: 'example1',
    path: '/example1',
    component: Example1,
  },
  {
    name: 'classDom',
    path: '/classDom',
    component: Aniamtion,
  },
  {
    name: 'Textures',
    path: '/Textures',
    component: Textures,
  },
  {
    name: 'shaderTop',
    path: '/shaderTop',
    component: shaderTop,
  },
  {
    name: 'shaderTop2',
    path: '/shaderTop2',
    component: shaderTop2,
  },
  {
    name: 'shaderTop-explore',
    path: '/explore',
    component: explore,
  },
  {
    name: '/',
    path: '/',
    component: Home,
  },
];
