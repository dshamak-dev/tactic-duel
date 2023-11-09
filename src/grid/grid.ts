import { Vector2 } from "src/support/vector";

export class Grid {
  size: Vector2;

  constructor(x: number = 1, y: number = 1) {
    this.size = new Vector2(x, y);
  }

  canMoveTo(position: Vector2): boolean {
    const {x, y} = position;

    if (x < 0 || x >= this.size.x || y < 0 || y >= this.size.y) {
      return false;
    }

    return true;
  }
}