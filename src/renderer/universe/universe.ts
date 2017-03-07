import Planet from "./planet/planet";
import Sky from "./sky/sky";
import Composer from "./composer/composer";
import Sun from "./sun/sun";

export default class Universe {
  private _composer: Composer;
  private _renderTarget: THREE.WebGLRenderTarget;
  private _scene: THREE.Scene;
  private _planet: Planet;
  private _sun: Sun;
  private _sky: Sky;

  constructor(private _renderer: THREE.WebGLRenderer, private _camera: THREE.Camera) {
    this._composer = new Composer(_renderer, _camera);
    this._scene = new THREE.Scene();

    this._sky = new Sky(_renderer);
    this._sun = new Sun(_renderer, _camera, this._scene);
    this._planet = new Planet(_renderer, _camera, this._scene);

    this._renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    });

    console.log(window.innerWidth, window.innerHeight)
  }

  public render(time: number) {
    this._sky.render(time);

    this._sun.update(time);
    this._planet.update(time);
    this._renderer.render(this._scene, this._camera, this._renderTarget);

    this._composer.render(this._renderTarget.texture, this._sky.texture);
  }
}