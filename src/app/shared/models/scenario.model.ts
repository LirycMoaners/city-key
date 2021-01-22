import { Step } from './step.model';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  image: string;
  steps: Step[];
}
