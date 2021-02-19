import { MechanismType } from '../enums/mechanism-type.enum';

export interface Mechanism {
  uid: string;
  name: string;
  title: string;
  description: string;
  type: MechanismType;
  unlockedItemsId: string[];
  unlockedMechanismsId: string[];
  unlockedMarkersId: string[];
  unlockingCombination?: number;
  unlockingItemId?: string;
  image?: string;
}
