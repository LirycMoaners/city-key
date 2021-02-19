import {ScenarioType} from '../enums/scenario-type.enum';

export interface ScenarioFilter {
  cityId: string;
  rate: number;
  difficulty: number;
  estimatedDuration: number;
  type: ScenarioType;
}
