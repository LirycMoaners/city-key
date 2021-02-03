import { Item } from './item.model';
import { Marker } from './marker.model';
import { Mechanism } from './mechanism.model';
import { Step } from './step.model';

export interface Game {
  uid?: string;
  scenarioId: string;
  items: Item[];
  mechanisms: Mechanism[];
  markers: Marker[];
  completedMechanismsId: string[];
  reachableSteps: Step[];
}
