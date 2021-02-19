import { Scenario } from './scenario.model';

export interface Game {
  uid?: string;
  scenario: Scenario;
  itemsId: string[];
  mechanismsId: string[];
  markersId: string[];
  completedMechanismsId: string[];
  reachableStepsId: string[];
}
