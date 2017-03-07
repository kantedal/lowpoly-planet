#extension GL_OES_standard_derivatives : enable

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 sunPosition;
uniform float oceanLevel;
uniform float time;

vec3 phong(vec3 ka, vec3 kd, vec3 ks, float alpha, vec3 normal) {
    vec3 n = normalize( normal );
    vec3 s = normalize( vPosition - sunPosition );
    vec3 v = normalize( vPosition - cameraPosition );
    vec3 r = reflect( -s, n );

    vec3 ambient = max(0.0, dot(normalize(cameraPosition), normal)) * ka;
    vec3 diffuse = max(0.0, dot(normalize(sunPosition), normal)) * kd;
    vec3 specular = pow(max(dot(r,v), 0.0), alpha) * ks;

    return ambient + diffuse + specular;
}

void main() {
    vec3 dX = dFdx(vPosition);
    vec3 dY = dFdy(vPosition);
    vec3 normal = normalize(cross(dX, dY));


    float height = length(vPosition);
    vec3 ambientColor = vec3(0.03, 0.1, 0.05);
    vec3 diffuseColor = vec3(0.1, 0.2, 0.1);
    vec3 specularColor = vec3(0.1);

    if (height < oceanLevel + 1.2) {
        ambientColor = vec3(0.2, 0.2, 0.1);
        diffuseColor = vec3(0.2, 0.2, 0.1);
    }

//    if (abs(dot(normalize(vPosition), normal)) < 0.9) {
//        ambientColor = vec3(0.1, 0.1, 0.1);
//        diffuseColor = vec3(0.1, 0.1, 0.1);
//    }


    vec3 phongColor = phong(ambientColor, diffuseColor, specularColor, 10.0, normal);
    vec3 flatAmbient = vec3(0.0, 0.0, 0.0);
    gl_FragColor = vec4(phongColor + flatAmbient, 1.0);
}