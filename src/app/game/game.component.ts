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
  public isGoogleMapApiLoaded$: Observable<boolean> = this.httpClient.jsonp(
    'https://maps.googleapis.com/maps/api/js?key=' + apiKeys.googleMapKey,
    'callback'
  ).pipe(
    map(() => true),
    catchError(() => of(false))
  );
  public center: google.maps.LatLngLiteral = { lat: 48.8581929, lng: 2.3508915 };
  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
    // @ts-ignore
    styles : mapStyle.default
  };
  public markerPositions: google.maps.LatLngLiteral[] = [];
  public markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.initGeolocation();
  }

  /**
   * Initialize the center position of the map & the marker position of the player
   */
  private initGeolocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
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
