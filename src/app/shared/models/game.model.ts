import { Item } from './item.model';
import { Marker } from './marker.model';
import { Mechanism } from './mechanism.model';
import { Scenario } from './scenario.model';
import { Step } from './step.model';

export class Game {
  id: string;
  scenario: Scenario;
  items: Item[];
  mechanisms: Mechanism[];
  markers: Marker[];
  completedMechanismsId: string[];
  reachableSteps: Step[];

  constructor(scenario: Scenario) {
    this.id = '';
    this.scenario = {...scenario};
    this.completedMechanismsId = [];
    this.items = [];
    this.markers = [];
    this.mechanisms = [];
    this.reachableSteps = [];
  }
}
