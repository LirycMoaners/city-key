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
      description: 'Les premier des scénarios !!!',
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
              name: 'A text',
              type: ItemType.TEXT,
              text: 'Lorem Ipsum'
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
              unlockingKey: 9999
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
              unlockingKey: 1234
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
