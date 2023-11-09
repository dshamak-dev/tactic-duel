export class Character {
  health: number;
  ammo: number;
  shield: number;

  constructor(props: Character) {
    Object.assign(this, props);
  }
}
