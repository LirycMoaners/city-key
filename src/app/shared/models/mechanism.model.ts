import { MechanismType } from '../enums/mechanism-type.enum';
import { Item } from './item.model';
import { Marker } from './marker.model';

export interface Mechanism {
  id: string;
  name: string;
  title: string;
  description: string;
  type: MechanismType;
  unlockedItems: Item[];
  unlockedMechanisms: Mechanism[];
  unlockedMarkers: Marker[];
  unlockingCombination?: number;
  unlockingKeyId?: string;
  image?: string;
}
