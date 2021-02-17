import { Item } from './item.model';
import { Marker } from './marker.model';
import { Mechanism } from './mechanism.model';
import { ScenarioMetadata } from './scenario-metadata.model';
import { Step } from './step.model';

export interface Scenario {
  uid: string;
  metadata: ScenarioMetadata;
  steps: Step[];
  mechanisms: Mechanism[];
  items: Item[];
  markers: Marker[];
}
