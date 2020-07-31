/* eslint-disable no-unused-vars */
import React from 'react';

export default class Textures extends React.Component {
  componentDidMount() {
    this.initCanvas();
    this.props.onRef(this);
  }

  crateProgram(vertrex, fragment) {
    const gl = this.gl;
    this.vertrex = vertrex;
    this.fragment = fragment;
    const { vertrexShader, fragmentShader } = this.getShaderMatrix(vertrex, fragment);
    this.fragmentShader = fragmentShader;
    const program = this.getProgram(gl, vertrexShader, fragmentShader);

    return program;
  }

  setFragmentShader(fragmentVetrix) {
    const gl = this.gl;

    const program = gl.program;

    gl.detachShader(program, this.fragmentShader);

    const fragmentShader = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentVetrix);

    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    gl.program = program;
  }

  getProgram(gl, vertrexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertrexShader);
    gl.attachShader(program, fragmentShader);
    gl.program = program;
    gl.linkProgram(program);
    // gl.useProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (success) {
      return program;
    }
    gl.deleteProgram(program);
    throw new Error('error program init fail');
  }

  initCanvas() {
    this.canvas = document.getElementById('c');
    this.resizeCanvas(this.canvas);
    const gl = this.canvas.getContext('webgl');
    this.gl = gl;
  }

  getShaderMatrix(vertrex, fragment) {
    const vertrexShader = vertrex;
    const fragmentShader = fragment;
    return {
      vertrexShader: this.createShader(this.gl, this.gl.VERTEX_SHADER, vertrexShader),
      fragmentShader: this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShader),
    };
  }

  // 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
  createShader(gl, type, source) {
    var shader = gl.createShader(type); // 创建着色器对象
    gl.shaderSource(shader, source); // 提供数据源
    gl.compileShader(shader); // 编译 -> 生成着色器
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }

    gl.deleteShader(shader);
  }

  resizeCanvas(canvas) {
    // 获取浏览器中画布的显示尺寸
    var displayWidth = canvas.clientWidth;
    var displayHeight = canvas.clientHeight;

    // 检尺寸是否相同
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      // 设置为相同的尺寸
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
  }

  render() {
    return <canvas height="10" id="c" width="15"></canvas>;
  }
}
