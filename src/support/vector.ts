export class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  static center(vector: Vector2) {
    return new Vector2(Math.floor(vector.x / 2), Math.floor(vector.y / 2));
  }

  static add(...vectors: Vector2[]) {
    const _vector: Vector2 = new Vector2();

    vectors.forEach(it => {
      _vector.x += it.x;
      _vector.y += it.y;
    });

    return _vector;
  }
}
