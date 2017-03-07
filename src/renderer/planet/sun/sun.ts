import {IcoSphereGeometry} from "../../utils/icosphere-geometry";

/*
 Shader imports
 */
const sunFrag = require('raw-loader!glslify-loader!./shaders/sun.frag');
const sunVert = require('raw-loader!glslify-loader!./shaders/sun.vert');

export default class Sun {
  private _sunGeometry: IcoSphereGeometry;
  private _mesh: THREE.Mesh;
  private _uniforms: any;
  private _shader: THREE.ShaderMaterial;

  constructor() {
    this._sunGeometry = new IcoSphereGeometry(4.0, 2);

    this._uniforms = { time: { type: 'f', value: 0.0 } };
    this._shader = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: sunVert,
      fragmentShader: sunFrag,
      blending: THREE.AdditiveBlending
    });
    this._shader.needsUpdate = true;

    this._mesh = new THREE.Mesh(this._sunGeometry.geometry, this._shader);
    this._mesh.position.set(15,15,15);
  }

  public update(time: number) {
    this._uniforms.time.value = time;
  }

  get mesh(): THREE.Mesh { return this._mesh; }
}