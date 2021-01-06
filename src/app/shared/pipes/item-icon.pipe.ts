import { Pipe, PipeTransform } from '@angular/core';
import { ItemType } from '../enums/item-type.enum';

@Pipe({
  name: 'itemIcon'
})
export class ItemIconPipe implements PipeTransform {
  transform(value: ItemType, ...args: any[]): any {
    switch (value) {
      case ItemType.TEXT:
        return 'article';
      case ItemType.KEY:
        return 'vpn_key';
      default:
        return 'crop_original';
    }
  }
}
