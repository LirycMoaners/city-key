import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { Difficulty } from 'src/app/shared/enums/difficulty.enum';
import {ItemType} from 'src/app/shared/enums/item-type.enum';
import {MechanismType} from 'src/app/shared/enums/mechanism-type.enum';
import {Scenario} from 'src/app/shared/models/scenario.model';
import {ScenarioType} from '../../shared/enums/scenario-type.enum';

@Injectable()
export class ScenarioService {
  private mockDB: Scenario[] = [{
    id: '1',
    steps: [
      {
        id: '1',
        title: 'Hey !',
        description: 'Bienvenue dans le scénario !',
        isFirstStep: true,
        isLastStep: false,
        unlockedItems: [
          {
            id: '0',
            name: 'A key',
            type: ItemType.KEY,
            imgSrc: 'https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/key-icon.png'
          },
          {
            id: '1',
            name: 'A second key',
            type: ItemType.KEY,
            imgSrc: 'https://cdn1.iconfinder.com/data/icons/hawcons/32/699371-icon-24-key-512.png'
          }
        ],
        unlockedMechanisms: [
          {
            id: '0',
            description: 'a beautiful golden lock',
            name: 'Lock123',
            title: 'Lock closing a chest',
            type: MechanismType.FOUR_NRS_LOCK,
            unlockedItems: [
              {
                id: '1',
                name: 'A picture',
                type: ItemType.IMAGE,
                imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/NYC_14th_Street_looking_west_12_2005.jpg'
              }
            ],
            unlockedMechanisms: [
              {
                id: '2',
                description: 'a beautiful golden lock',
                name: 'Lock',
                title: 'Lock closing a chest',
                type: MechanismType.LOCK,
                unlockedItems: [],
                unlockedMechanisms: [],
                unlockedMarkers: [],
                unlockingKeyId: '0',
                image: 'https://cdn.pixabay.com/photo/2014/04/03/00/32/padlock-308589__340.png'
              }
            ],
            unlockedMarkers: [
              {
                id: '0',
                position: { lat: 51.1702647, lng: 4.3964923 },
                title: 'Test',
                description: 'It\'s a test',
                image: 'https://images.france.fr/zeaejvyq9bhj/3I6KpOJXfaq4GGAOgEoEOK/2085fcaae0d9d1c78d491c6852132057/cathedrale_notre-dame_de_reims-r_christian_lantenois.jpg'
              }
            ],
            unlockingCombination: 9999,
          },
          {
            id: '2',
            description: 'a beautiful golden lock',
            name: 'Lock',
            title: 'Lock closing a chest',
            type: MechanismType.LOCK,
            unlockedItems: [],
            unlockedMechanisms: [],
            unlockedMarkers: [],
            unlockingKeyId: '0',
            image: 'https://cdn.pixabay.com/photo/2014/04/03/00/32/padlock-308589__340.png'
          },
          {
            id: '3',
            description: 'somebody',
            name: 'Image search',
            title: 'A strange man',
            type: MechanismType.SSIM,
            unlockedItems: [],
            unlockedMechanisms: [],
            unlockedMarkers: [],
            image: '\\assets\\images\\test.jpg'
          }
        ],
        unlockedStepsId: ['2'],
        unlockedMarkers: [
          {
            id: '1',
            position: { lat: 51.17, lng: 4.39 },
            title: 'Test 2',
            description: 'It\'s another test',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/L%27%C3%A9chanson%2C_Nancy.jpg/220px-L%27%C3%A9chanson%2C_Nancy.jpg'
          }
        ]
      },
      {
        id: '2',
        title: 'La suite ...',
        description: 'Du nouveau dans l\'enquête !',
        isFirstStep: false,
        isLastStep: false,
        requiredMechanismsId: ['0'],
        requiredPosition: { lat: 50.8467839, lng: 4.3536178 },
        unlockedItems: [
          {
            id: '2',
            name: 'A key',
            type: ItemType.KEY
          }
        ],
        unlockedMechanisms: [
          {
            id: '1',
            description: 'an old iron lock',
            name: 'Lock456',
            title: 'Lock closing a drawer',
            type: MechanismType.FOUR_NRS_LOCK,
            unlockedItems: [],
            unlockedMechanisms: [],
            unlockedMarkers: [],
            unlockingCombination: 1234
          }
        ],
        unlockedStepsId: ['3'],
        unlockedMarkers: []
      },
      {
        id: '3',
        title: 'Fin !',
        description: 'Bravo vous avez réussi !',
        isFirstStep: false,
        isLastStep: true,
        requiredMechanismsId: ['1'],
        requiredPosition: { lat: 50.453286, lng: 3.9509247 },
        unlockedItems: [],
        unlockedMechanisms: [],
        unlockedStepsId: [],
        unlockedMarkers: []
      }
    ],
    scenarioMetadata: {
      title: 'Scenario de test',
      image: 'https://media.routard.com/image/73/7/belgique-gand.1487737.c1000x300.jpg',
      city: 'Gand',
      description: 'Le premier des scénarios !!!',
      rate: 3.5,
      difficulty: Difficulty.EASY,
      estimatedDuration: 120,
      creationDate: new Date('2021/01/02'),
      lastUpdateDate: new Date('2021/01/25'),
      timesPlayed: 27,
      authorId: '1',
      type: ScenarioType.PERMANENT
    }
  }];

  constructor() { }

  /**
   * Get all the scenarii
   */
  public readAllScenario(): Observable<Scenario[]> {
    return of(this.mockDB);
  }

}
