import Land from "./land/land";
import Ocean from "./ocean/ocean";
import Cloud from "./cloud/cloud";

export default class Planet {
  private _land: Land;
  private _ocean: Ocean;
  private _clouds: Cloud[];
  private _renderTarget: THREE.WebGLRenderTarget;

  constructor(private _renderer: THREE.WebGLRenderer, private _camera: THREE.Camera, private _scene: THREE.Scene) {
    this._land = new Land();
    this._scene.add(this._land.mesh);

    this._ocean = new Ocean();
    this._scene.add(this._ocean.mesh);

    this._clouds = [];
    for (let i = 0; i < 10; i++) {
      let cloud = new Cloud();

      this._clouds.push(cloud);
      this._scene.add(cloud.cloudGroup);
    }
  }

  public update(time: number) {
    let delta = 0.01;

    this._ocean.update(time);

    for (let cloud of this._clouds) {
      cloud.update(time, delta);
    }
  }

  get texture(): THREE.Texture { return this._renderTarget.texture; }
}