import {IcoSphereGeometry} from "../../utils/icosphere-geometry";

/*
 Shader imports
 */
const oceanFrag = require('raw-loader!glslify-loader!./shaders/ocean.frag');
const oceanVert = require('raw-loader!glslify-loader!./shaders/ocean.vert');

export default class Ocean {
  private _oceanGeometry: IcoSphereGeometry;
  private _uniforms: any;
  private _shader: THREE.ShaderMaterial;
  private _mesh: THREE.Mesh;

  constructor() {
    this._oceanGeometry = new IcoSphereGeometry(9.2, 4);
    this._uniforms = {
      sunPosition: { type: 'v3', value: new THREE.Vector3(10,10,10)},
      time: { type: 'f', value: 0.0 }
    };
    this._shader = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: oceanVert,
      fragmentShader: oceanFrag,
      blending: THREE.AdditiveBlending
    });
    this._shader.needsUpdate = true;
    this._mesh = new THREE.Mesh(this._oceanGeometry.geometry, this._shader);

  }

  public update(time: number) {
    this._uniforms.time.value = time;
  }

  get mesh(): THREE.Mesh { return this._mesh; }
}