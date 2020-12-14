import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as apiKeys from '../../assets/secure/api-keys.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 48.8581929, lng: 2.3508915 };
  options: google.maps.MapOptions = {
    styles : [
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          { color: '#474747' }
        ]
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'landscape.man_made',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#f0dfca' }
        ]
      },
      {
        // @ts-ignore
        featureType: 'landscape.man_made.building',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#a3a3a3' }
        ]
      },
      {
        // @ts-ignore
        featureType: 'landscape.man_made.building',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#575757' }
        ]
      },
      {
        featureType: 'landscape.natural',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#f0dfca' }
        ]
      },
      {
        featureType: 'poi.business',
        elementType: 'all',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'poi.medical',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#f0dfca' }
        ]
      },
      {
        featureType: 'poi.sports_complex',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#f0dfca' }
        ]
      },
      {
        featureType: 'poi.school',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#f0dfca' }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#a5dfac' }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#f0dfca',
            saturation: 78
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
          { color: '#545454' }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [
          {
            saturation: -40,
            lightness: 52
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          { color: '#a2d2c5' }
        ]
      }
    ]
  };
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
  }
}
