import { Item } from './item.model';
import { Mechanism } from './mechanism.model';

export interface Step {
  id: string;
  title: string;
  description: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  requiredMechanismsId?: string[];
  requiredPosition?: google.maps.LatLngLiteral;
  unlockedItems: Item[];
  unlockedMechanisms: Mechanism[];
  unlockedStepsId: string[];
}
