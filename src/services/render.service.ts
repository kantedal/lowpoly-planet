import {Injectable, ElementRef} from "@angular/core";
import {Planet} from "../models/planet.model";

@Injectable()
export class RenderService {
  private _renderer: THREE.Renderer;
  private _scene: THREE.Scene;
  private _camera: THREE.Camera;
  private _controls: THREE.TrackballControls;

  constructor() {}

  public init(renderElement: ElementRef) {
    this._renderer = new THREE.WebGLRenderer();
    this._renderer.setSize(renderElement.nativeElement.clientWidth, renderElement.nativeElement.clientHeight);
    renderElement.nativeElement.appendChild(this._renderer.domElement);

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this._camera.position.z = 5;

    this._controls = new THREE.TrackballControls(this._camera, this._renderer.domElement);

    let planet = new Planet();
    this._scene.add(planet.mesh);

    let light = new THREE.AmbientLight(0x0c0c0c);
    this._scene.add(light);

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-30, 60, 60);
    spotLight.castShadow = true;
    this._scene.add(spotLight);


    this.render();
  }

  private render = () => {
    requestAnimationFrame( this.render );

    this._controls.update();
    this._renderer.render(this._scene, this._camera);
  }
}
