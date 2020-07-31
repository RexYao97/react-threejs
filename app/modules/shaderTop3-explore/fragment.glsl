// http://www.pouet.net/prod.php?which=57245
// If you intend to reuse this shader, please add credits to 'Danilo Guanabara'

precision mediump float;


uniform float iGlobalTime;
uniform vec2 iResolution;

varying vec2 vUv;
void main(){
	vec3 c;
	float l,z=iGlobalTime;
	for(int i=0;i<10;i++) {
		vec2 uv,p=vUv.xy/iResolution;
		uv=p;
		p-=.5;
		p.x*=iResolution.x/iResolution.y;
		z+=.07;
		l=length(p);
		uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z*2.));
		c[i]=.01/length(abs(mod(uv,1.)-.5));
	}
	gl_FragColor=vec4(c/l,iGlobalTime);
}