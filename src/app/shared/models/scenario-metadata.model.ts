import {ScenarioType} from '../enums/scenario-type.enum';

type Rating = 0|1|2|3|4|5;
type Difficulty = 1|2|3|4|5;

export interface ScenarioMetadata {
  title: string;
  image: string;
  city: string;
  description: string;
  rate: Rating;
  difficulty: Difficulty;
  estimatedDuration: number;
  creationDate: Date;
  lastUpdateDate: Date;
  timesPlayed: number;
  authorId: string;
  type: ScenarioType;
}
