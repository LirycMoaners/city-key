import {Injectable} from '@angular/core';
import {Mechanism} from '../../shared/models/mechanism.model';
import {MechanismType} from '../../shared/enums/mechanism-type.enum';

import {Observable, of} from 'rxjs';
import {ItemType} from '../../shared/enums/item-type.enum';

const mockDB: Mechanism[] = [
  {
    id: 0,
    description: 'a beautiful golden lock',
    name: 'Lock123',
    title: 'Lock closing a chest',
    type: MechanismType.FOUR_NRS_LOCK,
    unlockedItems: [
      {
        id: '99',
        name: 'New item',
        type: ItemType.TEXT,
        text: 'New stuff'
      }
    ],
    unlockingKey: 9999
  },
  {
    id: 1,
    description: 'an old iron lock',
    name: 'Lock456',
    title: 'Lock closing a drawer',
    type: MechanismType.FOUR_NRS_LOCK,
    unlockedItems: [],
    unlockingKey: 1234
  },
  {
    id: 2,
    description: 'a picture of a cat',
    name: 'LayerPuzzle123',
    title: 'Cat standing on a bridge',
    type: MechanismType.LAYER_PUZZLE,
    unlockedItems: []
  }
];

@Injectable({
  providedIn: 'root'
})
export class MechanismService {

  constructor() { }

  public readAll(): Observable<Mechanism[]> {
    return of(mockDB);
  }
}
