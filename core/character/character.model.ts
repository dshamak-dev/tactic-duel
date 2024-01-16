import { DateType, IdType } from "../common/common.model";

export interface ICharacter {
  id: IdType;
  createdAt: DateType;
}

export class Character {
  _id: any = null;
  parts: string[] = [];
  name: string = 'John Doe';
  avatarURL: string | null = null;

  get id() {
    return this._id;
  }

  constructor(props: any) {
    Object.assign(this, props);
  }

  normalize() {
    const { _id, ...other } = this;

    return { id: _id, ...other };
  }
}
