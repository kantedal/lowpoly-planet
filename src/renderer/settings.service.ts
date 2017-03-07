import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

export class PlanetSettings {
  id: number;
  planetRadius: number;
  planetSeed: number;
  planetAmplitude: number;
  oceanLevel: number;

  constructor(id: number) {
    this.id = id;
    this.planetRadius = 10.0;
    this.planetSeed = 0.0;
    this.planetAmplitude = 3.0;
    this.oceanLevel = 9.0;
  }
}

@Injectable()
export class SettingsService {
  private _planetsSettings: PlanetSettings[];

  constructor() {
    this._planetsSettings = [];
  }

  public getPlanetSettings(index: number) {
    return this._planetsSettings[index];
  }

  public addPlanet(): PlanetSettings {
    let newPlanet = new PlanetSettings(this._planetsSettings.length);
    this._planetsSettings.push(newPlanet);
    return newPlanet;
  }
}