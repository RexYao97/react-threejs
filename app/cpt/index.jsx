import React from 'react';
import { Link } from 'react-router-dom';
import './index.less';
class Cpt extends React.Component {
  render() {
    return (
      <div className="nav">
        <div className="link-btn">
          <Link to="/example1">example 2D+shader</Link>
        </div>
        <div className="link-btn">
          <Link to="/ClassDom">animation</Link>
        </div>
        <div className="link-btn">
          <Link to="/Textures">textures</Link>
        </div>
        <div className="link-btn">
          <Link to="/shaderTop">shaderTop</Link>
        </div>
        <div className="link-btn">
          <Link to="/shaderTop2">shaderTop2</Link>
        </div>
        <div className="link-btn">
          <Link to="/explore">explore</Link>
        </div>
      </div>
    );
  }
}

export default Cpt;
