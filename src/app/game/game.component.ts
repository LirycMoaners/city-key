import { Component, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import * as mapStyle from '../../assets/styles/map-style.json';
import { GoogleMapService } from '../core/http-services/google-map.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public isGoogleMapApiLoaded$: Observable<boolean>;
  public center: google.maps.LatLngLiteral = { lat: 48.8581929, lng: 2.3508915 };
  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
    // @ts-ignore
    styles : mapStyle.default
  };
  public markerPositions: google.maps.LatLngLiteral[] = [];
  public markerOptions: google.maps.MarkerOptions = {draggable: false};

  constructor(
    private readonly googleMapService: GoogleMapService
  ) {
    this.isGoogleMapApiLoaded$ = this.googleMapService.initGoogleMap();
  }

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
