import {IcoSphereGeometry} from "../../../utils/icosphere-geometry";

/*
 Shader imports
 */
const landFrag = require('raw-loader!glslify-loader!./shaders/land.frag');
const landVert = require('raw-loader!glslify-loader!./shaders/land.vert');

export default class Land {
  private _landGeometry: IcoSphereGeometry;
  private _uniforms: any;
  private _shader: THREE.ShaderMaterial;
  private _mesh: THREE.Mesh;

  constructor() {
    this._landGeometry = new IcoSphereGeometry(10.0, 3);
    this._uniforms = {
      sunPosition: { type: 'v3', value: new THREE.Vector3(10,10,10)}
    };
    this._shader = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: landVert,
      fragmentShader: landFrag,
      blending: THREE.AdditiveBlending
    });
    this._mesh = new THREE.Mesh(this._landGeometry.geometry, this._shader);
  }

  get mesh(): THREE.Mesh { return this._mesh; }
}