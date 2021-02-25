import { Pipe, PipeTransform } from '@angular/core';
import { MechanismType } from '../enums/mechanism-type.enum';

@Pipe({
  name: 'mechanismIcon'
})
export class MechanismIconPipe implements PipeTransform {
  transform(value: MechanismType): any {
    switch (value) {
      case MechanismType.LOCK:
      case MechanismType.FOUR_NRS_LOCK:
        return 'lock';
      default:
        return 'crop_original';
    }
  }
}
