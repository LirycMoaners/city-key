import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CityService } from 'src/app/core/http-services/city.service';

@Pipe({
  name: 'cityName'
})
export class CityNamePipe implements PipeTransform {
  constructor(
    private readonly cityService: CityService
  ) { }

  transform(id: string): Observable<string> {
    return this.cityService.readCity(id).pipe(
      map(city => city.name)
    );
  }
}
