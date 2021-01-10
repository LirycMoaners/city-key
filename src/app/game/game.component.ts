import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subscription, } from 'rxjs';
import { map } from 'rxjs/operators';
import * as mapStyle from '../../assets/styles/map-style.json';
import { GameService } from '../core/http-services/game.service';
import { GoogleMapService } from '../core/http-services/google-map.service';
import { Game } from '../shared/models/game.model';
import { Step } from '../shared/models/step.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  public isGoogleMapApiLoaded$: Observable<boolean>;
  public center: google.maps.LatLngLiteral = { lat: 48.8581929, lng: 2.3508915 };
  public options: google.maps.MapOptions = {
    disableDefaultUI: true,
    // @ts-ignore
    styles : mapStyle.default
  };
  public markerPositions: google.maps.LatLngLiteral[] = [];
  public markerOptions: google.maps.MarkerOptions = {draggable: false};
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly googleMapService: GoogleMapService,
    private readonly gameService: GameService
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

  /**
   * Initialize the center position of the map & the marker position of the player
   */
  private initGeolocation(): Observable<google.maps.LatLngLiteral> {
    if (navigator.geolocation) {
      return new Observable<google.maps.LatLngLiteral>(obs => {
        if (this.googleMapService.lastPosition) {
          this.center = { ...this.googleMapService.lastPosition };
          this.markerPositions = [{...this.googleMapService.lastPosition}];
          obs.next(this.googleMapService.lastPosition);
        }
        navigator.geolocation.watchPosition((position) => {
          this.googleMapService.lastPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.center = { ...this.googleMapService.lastPosition };
          this.markerPositions = [{...this.googleMapService.lastPosition}];
          obs.next(this.googleMapService.lastPosition);
        });
      });
    }
    return of(null);
  }

  private initGame(): Observable<Game> {
    return this.gameService.getCurrentGame().pipe(
      map(game => {
        if (!game.reachableSteps.length) {
          const firstStep: Step = game.scenario.steps.find(step => step.isFirstStep);
          game.reachableSteps.push(firstStep);
        }
        return game;
      })
    );
  }

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
            || (step.requiredPosition.lat === playerPosition.lat && step.requiredPosition.lng === playerPosition.lng)
          )
        ) {
          game.items.push(...step.unlockedItems);
          game.mechanisms.push(...step.unlockedMechanisms);
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
