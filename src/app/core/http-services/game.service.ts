import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { ItemType } from 'src/app/shared/enums/item-type.enum';
import { MechanismType } from 'src/app/shared/enums/mechanism-type.enum';
import { Game } from 'src/app/shared/models/game.model';

@Injectable()
export class GameService {
  private mockDB: Game[] = [{
    id: '1',
    scenario: {
      id: '1',
      name: 'Scenario de test',
      description: 'Le premier des scénarios !!!',
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
              unlockingCombination: 9999,
            },
            {
              id: '2',
              description: 'a beautiful golden lock',
              name: 'Lock',
              title: 'Lock closing a chest',
              type: MechanismType.LOCK,
              unlockedItems: [],
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
              image: '\\assets\\images\\test.jpg'
            }
          ],
          unlockedStepsId: ['2']
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
              unlockingCombination: 1234
            }
          ],
          unlockedStepsId: ['3']
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
          unlockedStepsId: []
        }
      ]
    },
    items: [],
    mechanisms: [],
    markers: [{
      id: '0',
      position: { lat: 51.1702647, lng: 4.3964923 },
      title: 'Test',
      description: 'It\'s a test',
      image: 'https://images.france.fr/zeaejvyq9bhj/3I6KpOJXfaq4GGAOgEoEOK/2085fcaae0d9d1c78d491c6852132057/cathedrale_notre-dame_de_reims-r_christian_lantenois.jpg'
    }, {
      id: '1',
      position: { lat: 51.17, lng: 4.39 },
      title: 'Test 2',
      description: 'It\'s another test',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/L%27%C3%A9chanson%2C_Nancy.jpg/220px-L%27%C3%A9chanson%2C_Nancy.jpg'
    }],
    completedMechanismsId: [],
    reachableSteps: []
  }];
  private currentGame$: ReplaySubject<Game> = new ReplaySubject(1);

  constructor() {
    this.currentGame$.next(this.mockDB[0]);
  }

  public getCurrentGame(): Observable<Game> {
    return this.currentGame$;
  }

  public updateCurrentGame(game: Game): Observable<void> {
    this.currentGame$.next({...game});
    return of();
  }
}
