import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CityService } from 'src/app/core/http-services/city.service';
import { ImageStorageService } from 'src/app/core/http-services/image-storage.service';
import { ScenarioService } from 'src/app/core/http-services/scenario.service';
import { City } from 'src/app/shared/models/city.model';
import { Scenario } from 'src/app/shared/models/scenario.model';
import { ImageTool } from 'src/app/shared/tools/image.tool';


@Component({
  selector: 'app-edition-info',
  templateUrl: './edition-info.component.html',
  styleUrls: ['./edition-info.component.scss']
})
export class EditionInfoComponent implements OnInit, OnDestroy {
  @Input() form?: FormGroup;
  @Input() scenario?: Scenario;
  public cities: City[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly scenarioService: ScenarioService,
    private readonly cityService: CityService,
    private readonly imageStorageService: ImageStorageService
  ) { }

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
        ).subscribe()
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
}
