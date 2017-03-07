#pragma glslify: snoise3 = require("glsl-noise/simplex/3d")

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float time;

void main() {
    vec3 newPosition =  position + snoise3(1.5 * vec3(time) + position * 0.7) * 0.12;

    vUv = uv;
    vPosition = vec3(modelMatrix * vec4(newPosition, 1.0));
    vNormal = vec3(modelMatrix * vec4(normal, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}