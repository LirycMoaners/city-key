import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CityService } from 'src/app/core/http-services/city.service';
import { GoogleMapService } from 'src/app/core/http-services/google-map.service';
import { ImageStorageService } from 'src/app/core/http-services/image-storage.service';
import { ScenarioService } from 'src/app/core/http-services/scenario.service';
import { City } from 'src/app/shared/models/city.model';
import { Scenario } from 'src/app/shared/models/scenario.model';
import { ImageTool } from 'src/app/shared/tools/image.tool';
import * as mapStyle from '../../../assets/styles/map-style.json';


@Component({
  selector: 'app-edition-info',
  templateUrl: './edition-info.component.html',
  styleUrls: ['./edition-info.component.scss']
})
export class EditionInfoComponent implements OnInit, OnDestroy {
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
  public cities: City[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly googleMapService: GoogleMapService,
    private readonly scenarioService: ScenarioService,
    private readonly cityService: CityService,
    private readonly imageStorageService: ImageStorageService
  ) {
    this.isGoogleMapApiLoaded$ = this.googleMapService.initGoogleMap();
  }

  ngOnInit(): void {
    if (this.form && this.scenario) {
      this.form.addControl('metadata', this.fb.group({
        title: [this.scenario?.metadata.title, Validators.required],
        image: [this.scenario?.metadata.image, Validators.required],
        cityId: [this.scenario?.metadata.cityId, Validators.required],
        position: [this.scenario?.metadata.position, Validators.required],
        description: [this.scenario?.metadata.description, Validators.required],
        difficulty: [this.scenario?.metadata.difficulty, Validators.required],
        estimatedDuration: [this.scenario?.metadata.estimatedDuration, Validators.required],
        type: [this.scenario?.metadata.type, Validators.required],
      }));

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
          if (!this.form?.get('metadata')?.get('position')?.value) {
            this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
            this.form?.get('metadata')?.patchValue({position: this.center});
          } else {
            this.center = this.form?.get('metadata')?.get('position')?.value;
          }
        })
      );
    }
    this.subscriptions.push(
      this.cityService.readAllCity().subscribe(cities => this.cities = cities)
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * Add or replace the current scenario image
   * @param target Target from the input file event
   */
  public uploadImage(target: EventTarget | null): void {
    const image = ImageTool.getImageFromTarget(target);

    if (image && this.scenario) {
      this.imageStorageService.pushFileToStorage(image, this.scenario?.uid).subscribe(url => {
        if (url) {
          this.form?.get('metadata')?.patchValue({image: url});
        }
      });
    }
  }

  /**
   * Update the scenario position by clicking on the map
   * @param event The mouse click event on the map
   */
  public changePosition(event: google.maps.MapMouseEvent): void {
    this.form?.get('metadata')?.patchValue({position: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
  }
}
