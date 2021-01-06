import { ItemType } from '../enums/item-type.enum';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  text?: string;
  imgSrc?: string;
}
