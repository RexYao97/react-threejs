
uniform float iTime;
uniform vec2 iResolution;

uniform vec2 iMouse;
    uniform vec2 resolution;
// float t=iTime;
// vec2 r=iResolution.xy;
void main() {
    vec3 c;
    float l,z=iTime;
    for(int i=0;i<3;i++) {
        vec2 uv,p=gl_FragCoord.xy/iResolution.xy;
        uv=p; p-=.5; p.x*=iResolution.x/iResolution.y;
        z+=.07;
        l=length(p);
        uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z*2.));
        c[i]=.01/length(abs(mod(uv,1.)-.5));
    }
    
    gl_FragColor = vec4(c/l,iTime); 
}