import { ItemType } from '../enums/item-type.enum';

export interface Item {
  uid: string;
  name: string;
  type: ItemType;
  text?: string;
  imgSrc?: string;
}
