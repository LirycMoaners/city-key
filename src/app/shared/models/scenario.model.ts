import { Step } from './step.model';
import {ScenarioMetadata} from './scenario-metadata.model';

export interface Scenario {
  id: string;
  steps: Step[];
  scenarioMetadata: ScenarioMetadata;
}
