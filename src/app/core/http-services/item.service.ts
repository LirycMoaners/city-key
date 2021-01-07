import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemType } from 'src/app/shared/enums/item-type.enum';
import { Item } from 'src/app/shared/models/item.model';

const mockDB: Item[] = [
  {
    id: '0',
    name: 'A text',
    type: ItemType.TEXT,
    text: 'Lorem Ipsum'
  },
  {
    id: '1',
    name: 'A picture',
    type: ItemType.IMAGE,
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/NYC_14th_Street_looking_west_12_2005.jpg'
  },
  {
    id: '2',
    name: 'A key',
    type: ItemType.KEY
  }
];

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor() { }

  public readAll(): Observable<Item[]> {
    return of(mockDB);
  }

  public add(items: Item[]): void {
    for (const item of items) {
      mockDB.push(item);
    }
  }
}
