/**
 * Created by fille on 2017-01-12.
 */

export class Renderer {
  private _renderer: THREE.Renderer;
  private _scene: THREE.Scene;
  private _camera: THREE.Camera;

  constructor() {
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( this._renderer.domElement );
  }
}
