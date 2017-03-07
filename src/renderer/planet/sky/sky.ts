/*
 Shader imports
 */
const skyFrag = require('raw-loader!glslify-loader!./shaders/sky.frag');
const skyVert = require('raw-loader!glslify-loader!./shaders/sky.vert');

export default class Sky {
  private _fboScene: THREE.Scene;
  private _orthographicCamera: THREE.OrthographicCamera;
  private _renderTarget: THREE.WebGLRenderTarget;
  private _shader: THREE.ShaderMaterial;
  private _uniforms: any;

  constructor(private _renderer: THREE.WebGLRenderer) {
    this._orthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow( 2, 53 ), 1);

    this._renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });

    this._uniforms = { time: { type: 'f', value: 0.0 } };
    this._shader = new THREE.ShaderMaterial({
      uniforms: this._uniforms,
      vertexShader: skyVert,
      fragmentShader: skyFrag,
      blending: THREE.AdditiveBlending
    });
    this._shader.needsUpdate = true;

    this._fboScene = new THREE.Scene();
    let geometry = new THREE.PlaneGeometry(2, 2, 50, 50);
    let plane = new THREE.Mesh( geometry, this._shader );
    this._fboScene.add( plane );
  }

  public render(time: number) {
    this._uniforms.time.value = time;
    this._renderer.render(this._fboScene, this._orthographicCamera);
  }
}