/* eslint-disable no-unused-vars */
import React from 'react';
import imaData from '../../common/img/moon.jpg';
import imaDataSaton from '../../common/img/Saturn.jpg';
import Base from '../base/index.jsx';
export default class Textures extends React.Component {
  onRef(ref) {
    this.child = ref;
    this.gl = ref.gl;
  }

  async loadTexture() {
    const image = await this.laodImage(imaData);
    const imageSaton = await this.laodImage(imaDataSaton);
    this.init(image, imageSaton);
  }

  async init(image, image2) {
    const gl = this.gl;

    const vertrexShader = this.getVertrexShader();
    const fragmentShader = this.getFragmentShader();
    const program = this.child.crateProgram(vertrexShader, fragmentShader);

    this.initText(gl, program, image);

    // 设置缩放canvas的对应缩放
    this.gl.useProgram(this.gl.program);
    this.initCanvansToMetrex(gl, program);
    this.drawImage(image, image2);
  }

  drawImage(image, image2) {
    const gl = this.gl;
    const program = this.gl.program;
    // 画正方形
    this.setRectangle(gl, 0, 0, image.width, image.height, program);

    this.setImage(gl, image);
    this.draw(gl);
    // this.gl.useProgram(this.gl.program);
    // 画正方形
    this.setRectangle(gl, image.width / 2, 0, image.width, image.height, program);

    this.setImage(gl, image2);
    this.draw(gl);
  }

  draw(gl) {
    var offset = 0; // 第几个开始
    var count = 6; // 需要使用到的点数
    // 画图
    gl.drawArrays(gl.TRIANGLES, offset, count);
  }

  initText(gl, program, image) {
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
    // 找到纹理的地址
    // 给矩形提供纹理坐标
    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordLocation);

    // 创建纹理
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 设置参数，让我们可以绘制任何尺寸的图像
    // webgl 1.0
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // 纹理缩小过滤器
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    // this.setImage(gl, image);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
  }

  setImage(gl, image) {
    // 将图像上传到纹理
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  }

  initCanvansToMetrex(gl, program) {
    var resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    // 设置全局变量 分辨率
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  }

  laodImage(imaData) {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = imaData; // 必须在同一域名下

      image.onload = function () {
        resolve(image);
      };
    }).then((res) => res);
  }

  setRectangle(gl, x, y, width, height, program) {
    // 数据位置与着色器程序绑定
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);
    // 适配 不超过canvas
    let scall = 1;
    if (width > gl.canvas.width) {
      scall = Math.min(scall, gl.canvas.width / width);
    }
    if (height > gl.canvas.height) {
      scall = Math.min(scall, gl.canvas.height / height);
    }

    width *= scall;
    height *= scall;
    var x1 = x;
    var x2 = Math.floor(x + width);
    var y1 = y;
    var y2 = Math.floor(y + height);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]), gl.STATIC_DRAW);
  }

  async changeFragment() {
    const fragmentVetrix = this.getFragmentShader(1);
    const gl = this.gl;
    const program = gl.program;
    const image = await this.laodImage(imaData);
    const image2 = await this.laodImage(imaDataSaton);
    this.child.setFragmentShader(fragmentVetrix);
    this.gl.useProgram(this.gl.program);
    this.initCanvansToMetrex(gl, program);
    this.drawImage(image, image2);
    // 画正方形
  }

  getVertrexShader() {
    return `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    
    uniform vec2 u_resolution;
    
    varying vec2 v_texCoord;
    
    void main() {
       vec2 zeroToOne = a_position / u_resolution;
       vec2 zeroToTwo = zeroToOne * 2.0;
       vec2 clipSpace = zeroToTwo - 1.0;
       gl_Position = vec4(clipSpace * vec2(1, -1) , 0, 1);
       v_texCoord = a_texCoord;
    }
  `;
  }

  getFragmentShader(type = 0) {
    let result;
    if (type === 0) {
      result = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
      void main() {
        gl_FragColor = texture2D(u_image, v_texCoord);
      }
      `;
    }
    if (type === 1) {
      result = `
      precision mediump float;
      uniform sampler2D u_image;
      varying vec2 v_texCoord;
      void main() {
        gl_FragColor = texture2D(u_image, v_texCoord).bgra;
      }
      `;
    }
    return result;
  }

  // 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
  createShader(gl, type, source) {
    var shader = gl.createShader(type); // 创建着色器对象
    gl.shaderSource(shader, source); // 提供数据源
    gl.compileShader(shader); // 编译 -> 生成着色器
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    console.log(success, type, gl.COMPILE_STATUS, source);
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
    return (
      <div className="contain">
        <div>
          <button onClick={this.loadTexture.bind(this)}>图片纹理</button>
          <button onClick={this.changeFragment.bind(this)}>修改片段着色器</button>
          {/* <button>着色器自定义</button> */}
        </div>
        <Base onRef={this.onRef.bind(this)}></Base>
      </div>
    );
  }
}
