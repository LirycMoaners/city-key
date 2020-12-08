import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'city-key';
  apiLoaded: Observable<boolean>;
  @ViewChild('test') googleMap: ElementRef;z

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCRnkz903chyNcwW5W3A0_nWHE359oLdlw', 'callback')
        .pipe(
          map(() => {
            new google.maps.Map(this.googleMap.nativeElement, {mapId: 'a6e118a22ba119fa'});
            return true;
          }),
          catchError(() => of(false))
        );
  }
}
