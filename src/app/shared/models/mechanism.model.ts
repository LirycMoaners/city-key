import {MechanismType} from '../enums/mechanism-type.enum';
import { Item } from './item.model';

export interface Mechanism {
  id: string;
  name: string;
  title: string;
  description: string;
  type: MechanismType;
  unlockedItems: Item[];
  unlockingKey?: number;
}
