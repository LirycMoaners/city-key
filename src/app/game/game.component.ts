import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, } from 'rxjs';
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
  public game: Game;
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
    this.initGeolocation();
    this.subscriptions.push(
      this.gameService.getCurrentGame().subscribe(game => {
        this.game = game;
        if (!this.game.reachableSteps.length) {
          this.initGame();
        }
      })
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
  private initGeolocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.markerPositions = [{...this.center}];
      });
    }
  }

  private initGame(): void {
    const firstStep: Step = this.game.scenario.steps.find(step => step.isFirstStep);
    this.game.items = firstStep.unlockedItems;
    this.game.mechanisms = firstStep.unlockedMechanisms;
    this.game.reachableSteps = this.game.scenario.steps.filter(step => firstStep.unlockedStepsId.includes(step.id));
    this.gameService.updateCurrentGame(this.game);
  }
}
