import { ICharacter } from "../character/character.model";
import { DateType, IdType } from "../common/common.model";

export interface IPlayer {
  id: IdType;
  email: string;
  password: string;
  createdAt: DateType;
  characters: ICharacter["id"][];
  items: [];
  resources: [];
  history: [];
}

const playerFields = [
  "id",
  "email",
  "password",
  "createdAt",
  "characters",
  "items",
  "resources",
  "history",
];
const playerPublicFields = ["id", "email", "createdAt"];

export class Player {
  id: IdType | undefined;
  email: string | undefined;
  password: string | undefined;
  createdAt: DateType | undefined;
  characters: ICharacter["id"][] | undefined;
  items: [] | undefined;
  resources: [] | undefined;
  history: [] | undefined;

  constructor(props: any) {
    Object.assign(this, props);

    this.createdAt = props.createdAt || new Date().toISOString();
    this.items = props.items || [];
    this.characters = props.characters || [];
    this.resources = props.resources || [];
    this.history = props.history || [];
  }

  public() {
    const _self = this as any;

    const fields = playerPublicFields.reduce((prev, key) => {
      return { ...prev, [key]: _self[key] };
    }, {});
    return fields;
  }

  json() {
    const _self = this as any;
    const fields = playerFields.reduce((prev, key) => {
      return { ...prev, [key]: _self[key] };
    }, {});
    return fields;
  }
}
