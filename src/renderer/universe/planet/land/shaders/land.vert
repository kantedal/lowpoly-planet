#pragma glslify: snoise3 = require("glsl-noise/simplex/3d")
#pragma glslify: cnoise3 = require("glsl-noise/classic/3d")

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    // Sink ground for ocean
    float lowFreqOceanNoise = max(pow(cnoise3(vec3(24.0, 13.0, 1.0) + position * 0.15), 1.0) * 4.0, 0.0);
    float medFreqOceanNoise = 0.3 * max(pow(cnoise3(vec3(6.0, 1.0, 15.0) + position * 0.3), 1.0) * 4.0, 0.0);

    // Add some noise to ground
   // vec3 groundNoise = snoise3(position * 0.2) * 0.5;

    vec3 newPosition =  position + snoise3(position * 0.3) * 0.3 + normal * (lowFreqOceanNoise + medFreqOceanNoise);

    //vec3 newPosition = position + normal * (lowFreqOceanNoise + medFreqOceanNoise);
    vUv = uv;
    vPosition = vec3(modelMatrix * vec4(newPosition, 1.0));
    vNormal = vec3(modelMatrix * vec4(normal, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}