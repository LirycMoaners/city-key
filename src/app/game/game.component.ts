import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as apiKeys from '../../assets/secure/api-keys.json';
import * as mapStyle from '../../assets/styles/map-style.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 48.8581929, lng: 2.3508915 };
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    // @ts-ignore
    styles : mapStyle.default
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  apiLoaded: Observable<boolean>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.apiLoaded = this.httpClient.jsonp(
      'https://maps.googleapis.com/maps/api/js?key=' + apiKeys.googleMapKey,
      'callback'
    ).pipe(
      map(() => true),
      catchError(() => of(false))
    );

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.markerPositions = [{...this.center}];
        }
      );
    }
  }
}
