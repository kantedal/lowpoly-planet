
export class Planet {
  private _baseVertices: Array<THREE.Vector3>;
  private _baseFaces: Array<THREE.Face3>;
  private _geometry: THREE.Geometry;
  private _mesh: THREE.Mesh;

  constructor() {
    this.generateIcosahedron();
    this.generateGeometry();
  }

  private generateIcosahedron() {
    this._geometry = new THREE.Geometry();

    let t = (1.0 + Math.sqrt(5.0)) / 2.0;

    // Add vertices
    this._baseVertices = [];
    this._baseVertices.push(new THREE.Vector3(-1.0,  t, 0.0));
    this._baseVertices.push(new THREE.Vector3( 1.0,  t, 0.0));
    this._baseVertices.push(new THREE.Vector3(-1.0, -t, 0.0));
    this._baseVertices.push(new THREE.Vector3( 1.0, -t, 0.0));

    this._baseVertices.push(new THREE.Vector3(0.0, -1.0,  t));
    this._baseVertices.push(new THREE.Vector3(0.0,  1.0,  t));
    this._baseVertices.push(new THREE.Vector3(0.0, -1.0, -t));
    this._baseVertices.push(new THREE.Vector3(0.0,  1.0, -t));

    this._baseVertices.push(new THREE.Vector3( t,  0.0, -1.0));
    this._baseVertices.push(new THREE.Vector3( t,  0.0,  1.0));
    this._baseVertices.push(new THREE.Vector3(-t,  0.0, -1.0));
    this._baseVertices.push(new THREE.Vector3(-t,  0.0,  1.0));

    // Add faces
    this._baseFaces = [];
    this._baseFaces.push(new THREE.Face3(0, 11, 5));
    this._baseFaces.push(new THREE.Face3(0, 5, 1));
    this._baseFaces.push(new THREE.Face3(0, 1, 7));
    this._baseFaces.push(new THREE.Face3(0, 7, 10));
    this._baseFaces.push(new THREE.Face3(0, 10, 11));

    this._baseFaces.push(new THREE.Face3(1, 5, 9));
    this._baseFaces.push(new THREE.Face3(5, 11, 4));
    this._baseFaces.push(new THREE.Face3(11, 10, 2));
    this._baseFaces.push(new THREE.Face3(10, 7, 6));
    this._baseFaces.push(new THREE.Face3(7, 1, 8));

    this._baseFaces.push(new THREE.Face3(3, 9, 4));
    this._baseFaces.push(new THREE.Face3(3, 4, 2));
    this._baseFaces.push(new THREE.Face3(3, 2, 6));
    this._baseFaces.push(new THREE.Face3(3, 6, 8));
    this._baseFaces.push(new THREE.Face3(3, 8, 9));

    this._baseFaces.push(new THREE.Face3(4, 9, 5));
    this._baseFaces.push(new THREE.Face3(2, 4, 11));
    this._baseFaces.push(new THREE.Face3(6, 2, 10));
    this._baseFaces.push(new THREE.Face3(8, 6, 7));
    this._baseFaces.push(new THREE.Face3(9, 8, 1));

    this._geometry.computeFaceNormals();

    this._mesh = new THREE.Mesh(this._geometry, new THREE.MeshLambertMaterial({ color: 0x00ff00 }));
  }

  private generateGeometry() {
    let recursionLevel = 3;
    for (let i = 0; i < recursionLevel; i++) {
      for (let face of this._baseFaces) {
        let v0 = this._baseVertices[face.a];
        let v1 = this._baseVertices[face.b];
        let v2 = this._baseVertices[face.c];

        

      }
    }
  }

  private getMiddlePoint(v1: THREE.Vector3, v2: THREE.Vector3): THREE.Vector3 {
    let direction = v2.clone().sub(v1);
    let length = direction.length();
    direction = direction.normalize().multiplyScalar(0.5);
    return v1.clone().add(direction);
  }

  get mesh(): THREE.Mesh { return this._mesh; }
}
