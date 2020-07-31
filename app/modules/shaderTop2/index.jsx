import React from 'react';
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';
export default class ShaderTop extends React.Component {
  componentDidMount() {
    this.init();
  }

  init() {
    this.setIMouseAndITime();
    const container = document.getElementById('container');
    const camera = new React.$THREE.Camera();
    camera.position.z = 1;
    const scene = new React.$THREE.Scene();
    const renderer = new React.$THREE.WebGLRenderer();
    this.imouse = new React.$THREE.Vector2();
    const uniforms = {
      resolution: { type: 'v2', value: new React.$THREE.Vector2(500, 500) },
      iTime: {
        type: 'f',
        value: 1.0,
      },
      iResolution: {
        type: 'v2',
        value: new React.$THREE.Vector2(),
      },
      iMouse: {
        type: 'v2',
        value: this.imouse,
      },
    };
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(500, 500);
    container.appendChild(renderer.domElement);
    this.uniforms = uniforms;
    this.container = container;
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.createPlane(scene, uniforms);
    this.animate();
  }

  initShader(vertex, frag, uniforms) {
    return new React.$THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: frag,
    });
  }

  createPlane(scene, uniforms) {
    const geometry = new React.$THREE.PlaneBufferGeometry(2, 2);

    const material = this.initShader(vertex, fragment, uniforms);

    const mesh = new React.$THREE.Mesh(geometry, material);
    scene.add(mesh);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderCanvas();
  }

  setIMouseAndITime() {
    window.addEventListener('click', (evt) => {
      this.imouse.x = evt.x;
      this.imouse.y = evt.y;
    });
  }

  renderCanvas() {
    const uniforms = this.uniforms;
    const { renderer, scene, camera } = this;
    uniforms.iTime.value += 0.05;
    // console.log(uniforms.iTime);
    renderer.render(scene, camera);
  }

  render() {
    return <div id="container"> </div>;
  }
}
