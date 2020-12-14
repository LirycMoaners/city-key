import {Type} from './mechanism_type.enum';

export interface Mechanism {
  id: number;
  name: string;
  title: string;
  description: string;
  icon: string;
  type: Type;
  unlockedItems: any[];
}
