import { Character } from "src/character/character";

export const generateCharacter = () => {
  const health = Math.floor(Math.random() * 4) + 2;
  const ammo = Math.max(Math.floor(Math.random() * 3), 2) || null;
  const shield = Math.floor(Math.random() * 3) || null;
  // const stamina = 3;

  return new Character({ health, ammo, shield });
};
