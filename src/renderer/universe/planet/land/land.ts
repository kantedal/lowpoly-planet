import {IcoSphereGeometry} from "../../../utils/icosphere-geometry";
import {PlanetSettings} from "../../../settings.service";

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

  constructor(private _planetSettings: PlanetSettings) {
    this._landGeometry = new IcoSphereGeometry(1.0, 3);
    this._uniforms = {
      sunPosition: { type: 'v3', value: new THREE.Vector3(10,10,10)},
      planetRadius: { type: 'f', value: 10.0 },
      planetSeed: { type: 'f', value: 0.0 },
      oceanLevel: { type: 'f', value: 0.0 }
    };
    this._shader = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: landVert,
      fragmentShader: landFrag,
      blending: THREE.AdditiveBlending
    });
    this._shader.needsUpdate = true;
    this._mesh = new THREE.Mesh(this._landGeometry.geometry, this._shader);
  }

  public update(time: number) {
    this._uniforms.planetRadius.value = this._planetSettings.planetRadius;
    this._uniforms.planetSeed.value = this._planetSettings.planetSeed;
    this._uniforms.oceanLevel.value = this._planetSettings.oceanLevel;
  }

  get mesh(): THREE.Mesh { return this._mesh; }
}