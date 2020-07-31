import React, { Component } from 'react';
import Base from '../base/index.jsx';
class Home extends Component {
  onRef(ref) {
    this.child = ref;
    this.gl = ref.gl;
  }

  refClick() {
    const gl = this.gl;
    const vertrex = this.getVertrexShader();
    const fragment = this.getFragmentShader();
    console.log(vertrex, fragment);
    this.program = this.child.crateProgram(vertrex, fragment);

    // 数据位置与着色器程序绑定
    const positionAttributeLocation = gl.getAttribLocation(this.program, 'b_position');
    // 先我们需要启用对应属性;
    gl.enableVertexAttribArray(positionAttributeLocation);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const position = [0, 0, 0, 1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
    this.initRender(gl, positionAttributeLocation);
    this.draw(gl);
  }

  initRender(gl, positionAttributeLocation) {
    var size = 2; // 每次迭代运行提取两个单位数据
    var type = gl.FLOAT; // 每个单位的数据类型是32位浮点型
    var normalize = false; // 不需要归一化数据
    var stride = 0; // 0 = 移动单位数量 * 每个单位占用内存（sizeof(type)）
    // 每次迭代运行运动多少内存到下一个数据开始点
    var offset = 0; // 从缓冲起始位置开始读取
    // 操作GUI渲染的方式
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
  }

  draw(gl) {
    var offset = 0; // 第几个开始
    var count = 3; // 需要使用到的点数
    // 画图
    gl.drawArrays(gl.TRIANGLES, offset, count);
  }

  getVertrexShader() {
    return `
    attribute vec2 b_position;
    void main() {
      gl_Position = vec4(b_position, 0, 1);
    }
  `;
  }

  getFragmentShader() {
    return `
    void main() {
      gl_FragColor = vec4(0, 0.5, 0.5, 1);
    }
    `;
  }

  render() {
    return (
      <div className="contain">
        <div>
          <button onClick={this.refClick.bind(this)}>初始化</button>
        </div>
        <Base onRef={this.onRef.bind(this)}></Base>
      </div>
    );
  }
}
export default Home;
