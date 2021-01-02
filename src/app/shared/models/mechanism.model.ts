import {MechanismType} from '../enums/mechanism-type.enum';

export interface Mechanism {
  id: number;
  name: string;
  title: string;
  description: string;
  icon: string; // name of a mat-icon
  type: MechanismType;
  unlockedItems: any[];
}
