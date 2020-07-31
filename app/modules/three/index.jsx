import React from 'react';
// import vertex from './vertex.glsl';
// import fragment from './fragment.glsl';
export default class ShaderTop extends React.Component {
  componentDidMount() {
    this.container = document.getElementById('container');
    this.init2D(this);
    const { height, width } = document.getElementById('container').getBoundingClientRect();

    this.setDisplay(width, height);
    this.props.onRef(this);
  }

  init2D() {
    this.scene = new React.$THREE.Scene();
    this.camera = new React.$THREE.Camera();
    this.renderer = new React.$THREE.WebGLRenderer();
    this.container.appendChild(this.renderer.domElement);
  }

  setDisplay(width, height) {
    this.canvasHeight = height;
    this.canvasWidth = width;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
  }

  initShader(vertex, frag, uniforms) {
    return new React.$THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: frag,
      side: 2,
    });
  }

  createBox(x, y, z, vertex, frag, uniforms) {
    const shadertoy = this.initShader(vertex, frag, uniforms);
    const box = new React.$THREE.Mesh(new React.$THREE.BoxGeometry(x, y, z), shadertoy);
    this.scene.add(box);
  }

  createPlane(vertex, fragment, uniforms) {
    const scene = this.scene;
    const geometry = new React.$THREE.PlaneBufferGeometry(2, 2);

    const material = this.initShader(vertex, fragment, uniforms);

    const mesh = new React.$THREE.Mesh(geometry, material);

    scene.add(mesh);
  }

  animate(callback) {
    if (this.framAnima) {
      cancelAnimationFrame(this.framAnima);
    }
    this.renderCanvas(callback);
  }

  renderCanvas(callback) {
    callback();
    this.framAnima = requestAnimationFrame(this.renderCanvas.bind(this, callback.bind(this)));
    const { renderer, scene, camera } = this;
    renderer.render(scene, camera);
  }

  render() {
    return <div id="container"> </div>;
  }
}
