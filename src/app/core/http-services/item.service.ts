import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemType } from 'src/app/shared/enums/item-type.enum';
import { Item } from 'src/app/shared/models/item.model';

const mockDB: Item[] = [
  {
    id: '0',
    name: 'A text',
    type: ItemType.TEXT,
    text: '<p>Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>. Praesent luctus augue non justo tincidunt pellentesque. Quisque molestie arcu eu augue ornare sagittis. Sed luctus libero nec lorem sollicitudin vestibulum. In sit amet nibh tempus, porttitor eros porttitor, ullamcorper ligula. Praesent ultricies est mi, ac tristique felis commodo tempus. Vivamus lacinia laoreet mauris eget pretium. Duis vestibulum massa a efficitur luctus. <i>Etiam tempus turpis vitae metus maximus</i>, eu ultricies diam ultrices. Vestibulum et laoreet dolor. Aenean finibus cursus mi, eu bibendum mi iaculis a. Phasellus pulvinar varius lorem et gravida. Donec posuere mi quis sem porta, a egestas odio faucibus. Proin vestibulum, nisi in rhoncus finibus, risus dolor luctus tellus, eu semper metus libero id eros. Donec molestie aliquam lacus at tristique. Donec ullamcorper, tortor ac tempor euismod, elit erat hendrerit turpis, eget venenatis augue urna et enim.</p>' +
      '<p>Quisque consectetur vestibulum enim quis malesuada. Pellentesque augue neque, condimentum ut molestie non, tincidunt sed risus. Nulla libero elit, egestas eu malesuada consequat, finibus at sem. Nulla vitae nisi tincidunt, gravida nisl id, dignissim felis. Morbi gravida vitae dolor at lobortis. Quisque fermentum dui id arcu placerat, placerat scelerisque elit tincidunt. Suspendisse lacinia ipsum ut rhoncus pulvinar. Quisque nec nisl ligula. Nunc sollicitudin varius metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin a neque id augue porttitor fringilla. Curabitur cursus mi volutpat sem convallis, vel tristique eros mattis.</p>'
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

  public add(items: Item[]): Observable<Item[]> {
    for (const item of items) {
      mockDB.push(item);
    }
    return of(mockDB);
  }
}
