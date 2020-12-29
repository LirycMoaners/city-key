import {MechanismType} from '../enums/mechanism_type.enum';

export interface MechanismModel {
  id: number;
  name: string;
  title: string;
  description: string;
  icon: string; // name of a mat-icon
  type: MechanismType;
  unlockedItems: any[];
}
