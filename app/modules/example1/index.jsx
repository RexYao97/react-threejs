/* eslint-disable no-unused-vars */
import React from 'react';
import Base from '../base/index.jsx';
export default class Example extends React.Component {
  onRef(ref) {
    this.child = ref;
    this.gl = ref.gl;
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

  // 创建程序
  createProgram(gl, index) {
    // 位置
    const vertexShaderSource = this.getVertexShader(index);

    // 片段着色器
    const fragmentShaderSource = this.getFragmentShaderSourece();
    const program = this.child.crateProgram(vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);
    return program;
  }

  setShaderAndUniformAtrri(gl, program, index) {
    if (index === 1) {
      var resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

      // 设置全局变量 分辨率
      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    }
  }

  getPosition(index = 0) {
    if (index === 0) {
      return [0, 0, 0, 1, 1, 1];
    }
    if (index === 1) {
      return [0, 0, 0, 200, 200, 200];
    }
  }

  setTriangleBuffer(gl, program, index) {
    // 数据位置与着色器程序绑定
    const positionAttributeLocation = gl.getAttribLocation(program, 'b_position');
    // 先我们需要启用对应属性;
    gl.enableVertexAttribArray(positionAttributeLocation);
    // 创建一个缓冲
    const positionBuffer = gl.createBuffer();
    // WebGL内部的全局变量。 首先绑定一个数据源到绑定点，然后可以引用绑定点指向该数据源。
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // 三个二维点坐标
    var positions = this.getPosition(index);
    // 指定缓存的绑定点， 缓存区大小， 缓存的usage类型
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
    var size = 2; // 每次迭代运行提取两个单位数据
    var type = gl.FLOAT; // 每个单位的数据类型是32位浮点型
    var normalize = false; // 不需要 整型数据值在转换为浮点数归一化数据
    var stride = 0; // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
    // 每次迭代运行运动多少内存到下一个数据开始点
    var offset = 0; // 从缓冲起始位置开始读取
    // 操作GUI渲染的方式
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
  }

  init(index = 0) {
    const gl = this.gl;
    // 创建着色程序
    const program = this.createProgram(gl, index);
    // 接下来我们需要告诉WebGL怎么从我们之前准备的缓冲中获取数据给着色器中的属性。 首
    this.setShaderAndUniformAtrri(gl, program, index);
    this.setTriangleBuffer(gl, program, index);
    // 渲染
    // 重置视口
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // 清空画布
    gl.clearColor(0, 0, 0, 0);
    // gl.COLOR_BUFFER_BIT   //颜色缓冲区
    // gl.DEPTH_BUFFER_BIT   //深度缓冲区
    // gl.STENCIL_BUFFER_BIT  //模板缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 运行
    var offset = 0; // 第几个开始
    var count = 3; // 需要使用到的点数
    // 画图
    gl.drawArrays(gl.TRIANGLES, offset, count);
  }

  getFragmentShaderSourece() {
    return `
    void main() {
      gl_FragColor = vec4(0, 0.5, 0.5, 1);
    }
  `;
  }

  getVertexShader(index) {
    if (index === 0) {
      return `
      attribute vec2 b_position;
      void main() {
        gl_Position = vec4(b_position, 0, 1);
      }
    `;
    }
    if (index === 1) {
      return `
        uniform vec2 u_resolution;
        attribute vec2 b_position;
        void main() {
          vec2 zeroToOne = b_position / u_resolution;
          vec2 zeroToTwo = zeroToOne * 2.0;
          vec2 clipSpace = zeroToTwo - 1.0;
          gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        }
      `;
    }
  }

  render() {
    return (
      <div className="contain">
        <div>
          <button onClick={this.init.bind(this, 0)}>着色器初始</button>
          <button onClick={this.init.bind(this, 1)}>着色器自定义</button>
        </div>
        <Base onRef={this.onRef.bind(this)}></Base>
      </div>
    );
  }
}
