import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, Observable, of, Subscription, } from 'rxjs';
import { map } from 'rxjs/operators';
import * as mapStyle from '../../assets/styles/map-style.json';
import { GameService } from '../core/http-services/game.service';
import { GoogleMapService } from '../core/http-services/google-map.service';
import { Game } from '../shared/models/game.model';
import { Marker } from '../shared/models/marker.model';
import { Step } from '../shared/models/step.model';
import { DistanceTool } from '../shared/tools/distance.tool';
import { StepDialogComponent } from './step-dialog/step-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  public isGoogleMapApiLoaded$: Observable<boolean>;
  public center: google.maps.LatLngLiteral = { lat: 48.8581929, lng: 2.3508915 };
  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
    // @ts-ignore
    styles : mapStyle.default
  };
  public userPosition: google.maps.LatLngLiteral;
  public userMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: { path: 0, scale: 10, fillColor: 'DodgerBlue', fillOpacity: 1, strokeOpacity: 0.8, strokeWeight: 5, strokeColor: 'lightblue' }
  };
  public markers: Marker[] = [];
  public currentMarker: Marker;
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly googleMapService: GoogleMapService,
    private readonly gameService: GameService,
    private readonly dialog: MatDialog
  ) {
    this.isGoogleMapApiLoaded$ = this.googleMapService.initGoogleMap();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([
        this.initGeolocation(),
        this.initGame()
      ]).pipe(
        map(([playerPosition, game]: [google.maps.LatLngLiteral, Game]) => this.checkSteps(playerPosition, game))
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public showInfoWindow(mapMarker: MapMarker, marker: Marker): void {
    this.currentMarker = marker;
    this.infoWindow.open(mapMarker);
  }

  /**
   * Initialize the center position of the map & the marker position of the player & watch position over time
   */
  private initGeolocation(): Observable<google.maps.LatLngLiteral> {
    if (navigator.geolocation) {
      return new Observable<google.maps.LatLngLiteral>(obs => {
        navigator.geolocation.watchPosition((position) => {
          this.googleMapService.lastPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.userPosition = { ...this.googleMapService.lastPosition };
          this.center = { ...this.googleMapService.lastPosition };
          obs.next(this.googleMapService.lastPosition);
        });
        if (this.googleMapService.lastPosition) {
          this.userPosition = { ...this.googleMapService.lastPosition };
          this.center = { ...this.googleMapService.lastPosition };
          obs.next(this.googleMapService.lastPosition);
        }
      });
    }
    return of(null);
  }

  /**
   * Initialize the game at the beginning & watch it over time for modifications
   */
  private initGame(): Observable<Game> {
    return this.gameService.getCurrentGame().pipe(
      map(game => {
        if (!game.reachableSteps.length && !game.completedMechanismsId.length) {
          const firstStep: Step = game.scenario.steps.find(step => step.isFirstStep);
          game.reachableSteps.push(firstStep);
        }
        this.markers = game.markers;
        return game;
      })
    );
  }

  /**
   * Check if a step is reach after completing a mechanism or reaching a position
   * @param playerPosition The current player position
   * @param game The current played game
   */
  private checkSteps(playerPosition: google.maps.LatLngLiteral, game: Game): Observable<void> {
    if (game.reachableSteps.length) {
      let isUpdateNeeded = false;
      for (const step of game.reachableSteps) {
        if (
          (
            !step.requiredMechanismsId
            || !step.requiredMechanismsId.length
            || step.requiredMechanismsId.every(id => game.completedMechanismsId.includes(id))
          )
          && (
            !step.requiredPosition
            || (DistanceTool.getDistanceBetweenCoordinates(step.requiredPosition, playerPosition) <= 50)
          )
        ) {
          this.dialog.open(StepDialogComponent, { data: step });
          game.items.push(...step.unlockedItems);
          game.mechanisms.push(...step.unlockedMechanisms);
          game.markers.push(...step.unlockedMarkers);
          game.reachableSteps.push(...step.unlockedStepsId.map(id => game.scenario.steps.find(s => s.id === id)));
          game.reachableSteps.splice(game.reachableSteps.indexOf(step), 1);
          isUpdateNeeded = true;
        }
      }
      if (isUpdateNeeded) {
        return this.gameService.updateCurrentGame(game);
      }
    }
    return of();
  }
}
