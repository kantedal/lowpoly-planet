import Land from "./land/land";
import Ocean from "./ocean/ocean";
import Cloud from "./cloud/cloud";
import {PlanetSettings} from "../../settings.service";

export default class Planet {
  private _planetGroup: THREE.Group;
  private _land: Land;
  private _ocean: Ocean;
  private _clouds: Cloud[];

  constructor(planetSettings: PlanetSettings) {
    this._planetGroup = new THREE.Group();
    this._land = new Land(planetSettings);
    this._planetGroup.add(this._land.mesh);

    this._ocean = new Ocean(planetSettings);
    this._planetGroup.add(this._ocean.mesh);

    this._clouds = [];
    for (let i = 0; i < 10; i++) {
      let cloud = new Cloud();

      this._clouds.push(cloud);
      this._planetGroup.add(cloud.cloudGroup);
    }
  }

  public update(time: number) {
    let delta = 0.01;

    this._ocean.update(time);
    this._land.update(time);

    for (let cloud of this._clouds) {
      cloud.update(time, delta);
    }
  }

  get planetGroup(): THREE.Group { return this._planetGroup; }
}