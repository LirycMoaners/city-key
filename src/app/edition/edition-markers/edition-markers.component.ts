import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GoogleMapService } from 'src/app/core/http-services/google-map.service';
import { ScenarioService } from 'src/app/core/http-services/scenario.service';
import { Scenario } from 'src/app/shared/models/scenario.model';
import * as mapStyle from '../../../assets/styles/map-style.json';

@Component({
  selector: 'app-edition-markers',
  templateUrl: './edition-markers.component.html',
  styleUrls: ['./edition-markers.component.scss']
})
export class EditionMarkersComponent implements OnInit {
  @Input() form?: FormGroup;
  @Input() scenario?: Scenario;
  public isGoogleMapApiLoaded$: Observable<boolean>;
  public options: google.maps.MapOptions = {
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    // @ts-ignore
    styles : mapStyle.default
  };
  public center?: google.maps.LatLngLiteral;
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly googleMapService: GoogleMapService,
    private readonly scenarioService: ScenarioService,
  ) {
    this.isGoogleMapApiLoaded$ = this.googleMapService.initGoogleMap();
  }

  ngOnInit(): void {
    if (this.form && this.scenario) {
      this.form.addControl('markers', this.fb.array([
        ...this.scenario.markers.map(marker => this.fb.group({
          uid: [marker.uid],
          position: [marker.position, Validators.required],
          title: [marker.title, Validators.required],
          description: [marker.description],
          image: [marker.image],
        }))
      ]));

      this.subscriptions.push(
        this.form.valueChanges.pipe(
          switchMap(() => {
            if (this.scenario) {
              this.scenario.metadata = { ...this.scenario?.metadata, ...this.form?.get('metadata')?.value };
              return this.scenarioService.updateScenario(this.scenario);
            }
            return of();
          })
        ).subscribe(),
        new Observable<GeolocationPosition>(obs => navigator.geolocation.getCurrentPosition(position => {
          obs.next(position);
          obs.complete();
        })).subscribe(position => {
          if (this.scenario?.markers.length) {
            this.center = this.scenario.markers[0].position;
          } else if (!this.form?.get('metadata')?.get('position')?.value) {
            this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
          } else {
            this.center = this.form?.get('metadata')?.get('position')?.value;
          }
        })
      );
    }
  }

  /**
   * Update the scenario position by clicking on the map
   * @param event The mouse click event on the map
   */
   public addMarker(event: google.maps.MapMouseEvent): void {
    console.log(event.latLng);
  }
}
