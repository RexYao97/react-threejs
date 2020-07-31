import React from 'react';
import vertex from './vertex.glsl';
import fragment from './fragment.glsl';
import THREE from '../three';

export default class ShaderTop extends React.Component {
  componentDidMount() {
    this.init();
    this.animate();
  }

  init() {
    const uniforms = {
      iGlobalTime: {
        type: 'f',
        value: 1.0,
      },
      iResolution: {
        type: 'v2',
        value: new React.$THREE.Vector2(1, 1),
      },
    };
    this.startTime = Date.now();
    this.uniforms = uniforms;
    this.child.createPlane(vertex, fragment, uniforms);
  }

  animate() {
    if (this.framAnima) {
      cancelAnimationFrame(this.framAnima);
    }
    this.child.animate(this.callback.bind(this));
  }

  callback() {
    this.uniforms.iGlobalTime.value += 0.01;
    const { renderer, scene, camera } = this;
    renderer.render(scene, camera);
  }

  setIMouseAndITime() {
    window.addEventListener('click', (evt) => {
      this.imouse.x = evt.x;
      this.imouse.y = evt.y;
    });
  }

  onRef(ref) {
    this.child = ref;
    this.scene = ref.scene;
    this.camera = ref.camera;
    this.renderer = ref.renderer;
    this.container = ref.container;
  }

  render() {
    return (
      <div>
        <button onClick={this.animate.bind(this)}>开始</button>
        <THREE onRef={this.onRef.bind(this)}> </THREE>
      </div>
    );
  }
}
