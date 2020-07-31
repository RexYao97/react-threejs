/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Base from '../base/index.jsx';
class ClassDom extends Component {
  constructor(props) {
    super(props);
    this.state = { g_time: new Date().getTime(), rad: 0, speed: 1 };
    console.log(React.$THREE);
  }

  onRef(ref) {
    this.child = ref;
    this.gl = ref.gl;
  }

  getShader() {
    const vertexShaderSrc = `
    attribute vec4 a_Position;// 接收传入位置坐标，必须声明为全局
    uniform mat4 u_Mat;// 旋转矩阵
    void main(){
        gl_Position = u_Mat * a_Position;
    }`;

    // 片段着色器源码
    const fragmentShaderSrc = `
      void main(){
          gl_FragColor = vec4(0, 0.0, 1.0, 1.0);
      }`;
    return { vertexShaderSrc, fragmentShaderSrc };
  }

  startAnimate() {
    this.rad = 0;
    const random = Math.floor(Math.random() * 3);
    const gl = this.gl;
    const { vertexShaderSrc, fragmentShaderSrc } = this.getShader();
    this.program = this.child.crateProgram(vertexShaderSrc, fragmentShaderSrc);
    console.log(this.program);
    gl.useProgram(this.program);
    // 三角形初始化顶点
    this.n = this.initVertexBuffers(gl);
    // 设置旋转矩阵
    this.gl.uniformMatrix4fv(this.u_Mat, false, this.getRotationMatrix(this.rad, 0, 0, 1));

    this.animate(random);
  }

  animate(type) {
    this.rad += 0.1;
    let spinMatrix;
    if (type === 0) {
      spinMatrix = this.getRotationMatrix(this.rad, 0, 0, 1);
    }
    if (type === 1) {
      spinMatrix = this.getRotationMatrix(this.rad, 0, 1, 0);
    }
    if (type === 2) {
      spinMatrix = this.getRotationMatrix(this.rad, 1, 0, 0);
    }
    this.gl.uniformMatrix4fv(this.u_Mat, false, spinMatrix);
    this.draw(this.gl, this.n);
    // 保存回调
    this.timeoute = requestAnimationFrame(this.animate.bind(this, type));
  }

  draw(gl, n) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // 指定清空canvas的颜色
    gl.clear(gl.COLOR_BUFFER_BIT); // 清空canvas
    gl.drawArrays(gl.TRIANGLES, 0, n);
  }

  initVertexBuffers(gl) {
    const program = this.program;
    console.log(program);
    var vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    var vertexBuffer = gl.createBuffer(); // 创建缓冲区对象
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); // 将缓冲区对象绑定到目标
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); // 向缓冲区中写入数据
    var a_Position = gl.getAttribLocation(program, 'a_Position'); // 获取a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0); // 将缓冲区对象分配给a_Position
    gl.enableVertexAttribArray(a_Position); // 链接a_Position与分配给他的缓冲区对象
    this.u_Mat = gl.getUniformLocation(program, 'u_Mat'); // 获取着色器中的矩阵变量
    return vertices.length / 2;
  }

  // 旋转矩阵
  getRotationMatrix(rad, x, y, z) {
    if (x > 0) {
      // 绕x轴的旋转矩阵
      return new Float32Array([
        1.0,
        0.0,
        0.0,
        0.0,
        0.0,
        Math.cos(rad),
        -Math.sin(rad),
        0.0,
        0.0,
        Math.sin(rad),
        Math.cos(rad),
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]);
    } else if (y > 0) {
      // 绕y轴的旋转矩阵
      return new Float32Array([
        Math.cos(rad),
        0.0,
        -Math.sin(rad),
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        Math.sin(rad),
        0.0,
        Math.cos(rad),
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]);
    } else if (z > 0) {
      // 绕z轴的旋转矩阵
      return new Float32Array([
        Math.cos(rad),
        Math.sin(rad),
        0.0,
        0.0,
        -Math.sin(rad),
        Math.cos(rad),
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        0.0,
        0.0,
        1.0,
      ]);
    } else {
      // 没有指定旋转轴，报个错，返回一个单位矩阵
      console.error('error: no axis');
      return new Float32Array([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
    }
  }

  render() {
    return (
      <div className="contain">
        <div>
          <button onClick={this.startAnimate.bind(this)}>开始动画</button>
          {/* <button onClick={this.init.bind(this, 1)}>着色器自定义</button> */}
        </div>
        <Base onRef={this.onRef.bind(this)}></Base>
      </div>
    );
  }
}
export default ClassDom;
