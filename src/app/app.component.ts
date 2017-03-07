import {Component, AfterViewInit, ViewChild, ElementRef} from "@angular/core";
import {RenderService} from "../renderer/render.service";
import {SettingsService, PlanetSettings} from "../renderer/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('renderArea') renderArea: ElementRef;

  private _selectedPlanet: PlanetSettings;

  constructor(
    private _renderService: RenderService,
    private _settingsService: SettingsService
  ) {}

  ngAfterViewInit(): void {
    this._renderService.init(this.renderArea);

    this._selectedPlanet = this._settingsService.getPlanetSettings(0);
  }

  planetSeedChanged(event: any) {
    this._selectedPlanet.planetSeed = event.value;
  }

  planetRadiusChanged(event: any) {
    this._selectedPlanet.planetRadius = event.value;
  }

  oceanLevelChanged(event: any) {
    this._selectedPlanet.oceanLevel = event.value;
  }
}
