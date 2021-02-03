import { Step } from './step.model';
import {ScenarioMetadata} from './scenario-metadata.model';

export interface Scenario {
  uid: string;
  steps: Step[];
  scenarioMetadata: ScenarioMetadata;
}
