import {ScenarioType} from '../enums/scenario-type.enum';

export interface ScenarioFilter {
  city: string;
  rate: number;
  difficulty: number;
  estimatedDuration: number;
  type: ScenarioType;
}
