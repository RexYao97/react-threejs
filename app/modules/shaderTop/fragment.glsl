//片元着色器
    uniform vec2 iResolution;
    uniform float iTime;
    uniform vec2 iMouse;
    uniform vec2 resolution;
    void main() {
        vec2 st = gl_FragCoord.xy/iMouse.xy;
        gl_FragColor=vec4(st.x,st.y,0.0,1.0);
    }
