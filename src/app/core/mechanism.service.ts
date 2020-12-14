import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Mechanism} from '../shared/mechanism';
import {Type} from '../shared/mechanism_type.enum';
import {Observable, of} from 'rxjs';

const mockDB: Mechanism[] = [
  {id: 0, description: 'a beautiful golden lock', name: 'Lock123', title: 'Lock closing a chest', icon: './../assets/temporary_imgs/chest1.png', type: Type.FOUR_NRS_LOCK, unlockedItems: ['a treasure map', 'a clue', 'a meeting point']},
  {id: 1, description: 'an old iron lock', name: 'Lock456', title: 'Lock closing a drawer', icon: './../assets/temporary_imgs/chest2.jpg', type: Type.FOUR_NRS_LOCK, unlockedItems: ['a clue', 'another clue']},
  {id: 2, description: 'a picture of a cat', name: 'LayerPuzzle123', title: 'Cat standing on a bridge', icon: './../assets/temporary_imgs/superposition.jpg', type: Type.LAYER_PUZZLE, unlockedItems: ['a very important clue']}
];

@Injectable({
  providedIn: 'root'
})
export class MechanismService {

  constructor(private http: HttpClient) { }

  public read(): Observable<Mechanism[]> {
    return of(mockDB);
  }
}
