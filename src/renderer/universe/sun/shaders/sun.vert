#pragma glslify: snoise3 = require("glsl-noise/simplex/3d")

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float time;

void main() {
    float noise = snoise3((position.xyz - vec3(15.0)) * 1.0 + vec3(time * 2.0)) * 0.5;
    vec3 newPosition = position + normal * noise;

    vUv = uv;
    vPosition = vec3(modelMatrix * vec4(newPosition, 1.0));
    vNormal = vec3(modelMatrix * vec4(normal, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}