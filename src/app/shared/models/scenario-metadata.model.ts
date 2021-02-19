import { Difficulty } from '../enums/difficulty.enum';
import { ScenarioType } from '../enums/scenario-type.enum';

export interface ScenarioMetadata {
  title: string;
  image: string;
  cityId: string;
  position: google.maps.LatLngLiteral;
  geohash: string;
  description: string;
  rate: number;
  difficulty: Difficulty;
  estimatedDuration: number;
  creationDate: Date;
  lastUpdateDate: Date;
  timesPlayed: number;
  authorId: string;
  type: ScenarioType;
  scenarioId: string;
}
