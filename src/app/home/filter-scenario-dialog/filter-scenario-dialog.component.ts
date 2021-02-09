import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScenarioType } from '../../shared/enums/scenario-type.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScenarioService } from '../../core/http-services/scenario.service';
import { Difficulty } from 'src/app/shared/enums/difficulty.enum';

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
  public readonly MAX_DURATION = 400;
  public readonly MIN_DURATION = 15;
  public cities = [];

  constructor(
    private readonly dialogRef: MatDialogRef<FilterScenarioDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly scenarioService: ScenarioService
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
    this.scenarioService.currentScenarioFilter = this.form.value;
    this.dialogRef.close(this.form.value);
  }

  /**
   * Close Dialog and pass an empty object to the component creating the Dialog
   */
  public resetFilter(): void {
    this.scenarioService.currentScenarioFilter = undefined;
    this.dialogRef.close({});
  }

  /**
   * Initialize formgroup with value if already init in service
   */
  private initForm(): void {
    this.form = this.formBuilder.group({
      city: [this.scenarioService.currentScenarioFilter?.city],
      rate: [this.scenarioService.currentScenarioFilter?.rate],
      difficulty: [this.scenarioService.currentScenarioFilter?.difficulty],
      estimatedDuration: [this.scenarioService.currentScenarioFilter?.estimatedDuration],
      type: [this.scenarioService.currentScenarioFilter?.type]
    });
  }

  /**
   * Get cities list
   */
  private getCities(): void {
    this.scenarioService.readAllAvailableCities().subscribe( cities => this.cities = cities);
  }

}
