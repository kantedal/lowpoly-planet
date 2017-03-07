import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {RenderService} from "../renderer/render.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('renderArea') renderArea: ElementRef;

  constructor(private _renderService: RenderService) {}

  ngAfterViewInit(): void {
    this._renderService.init(this.renderArea);
  }
}
