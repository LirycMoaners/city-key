import { Item } from './item.model';
import { Mechanism } from './mechanism.model';
import { Scenario } from './scenario.model';
import { Step } from './step.model';

export interface Game {
  id: string;
  scenario: Scenario;
  items: Item[];
  mechanisms: Mechanism[];
  completedMechanismsId: string[];
  reachableSteps: Step[];
}
