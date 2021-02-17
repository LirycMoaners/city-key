import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScenarioType } from '../../shared/enums/scenario-type.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScenarioService } from '../../core/http-services/scenario.service';
import { Difficulty } from 'src/app/shared/enums/difficulty.enum';
import { CityService } from 'src/app/core/http-services/city.service';
import { City } from 'src/app/shared/models/city.model';

@Component({
  selector: 'app-filter-scenario-dialog',
  templateUrl: './filter-scenario-dialog.component.html',
  styleUrls: ['./filter-scenario-dialog.component.scss']
})
export class FilterScenarioDialogComponent implements OnInit {
  public title = 'Filters';
  public form: FormGroup;
  public types = ScenarioType;
  public difficulties = Difficulty;
  public readonly MAX_DURATION = 240;
  public readonly MIN_DURATION = 30;
  public cities: City[] = [];

  constructor(
    private readonly dialogRef: MatDialogRef<FilterScenarioDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly scenarioService: ScenarioService,
    private readonly cityService: CityService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getCities();
  }

  /**
   * Close Dialog and pass form data to the component creating the Dialog
   */
  public filter(): void {
    this.scenarioService.currentFilter = this.form.value;
    this.dialogRef.close(this.form.value);
  }

  /**
   * Close Dialog and pass an empty object to the component creating the Dialog
   */
  public resetFilter(): void {
    this.scenarioService.currentFilter = undefined;
    this.dialogRef.close({});
  }

  /**
   * Initialize formgroup with value if already init in service
   */
  private initForm(): void {
    this.form = this.formBuilder.group({
      cityId: [this.scenarioService.currentFilter?.cityId],
      rate: [this.scenarioService.currentFilter?.rate],
      difficulty: [this.scenarioService.currentFilter?.difficulty],
      estimatedDuration: [this.scenarioService.currentFilter?.estimatedDuration],
      type: [this.scenarioService.currentFilter?.type]
    });
  }

  /**
   * Get cities list
   */
  private getCities(): void {
    this.cityService.readAllCity().subscribe( cities => this.cities = cities);
  }

}
