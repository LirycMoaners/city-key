import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScenarioType } from '../../shared/enums/scenario-type.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScenarioService } from '../../core/http-services/scenario.service';
import { Difficulty } from 'src/app/shared/enums/difficulty.enum';
import { CityService } from 'src/app/core/http-services/city.service';
import {ScenarioSortingCriterion} from '../../shared/enums/scenario-sorting-criterion.enum';

@Component({
  selector: 'app-filter-scenario-dialog',
  templateUrl: './filter-scenario-dialog.component.html',
  styleUrls: ['./filter-scenario-dialog.component.scss']
})
export class FilterScenarioDialogComponent implements OnInit {
  public title = 'Filters';
  public filterForm: FormGroup;
  public sortingForm: FormGroup;
  public types = ScenarioType;
  public difficulties = Difficulty;
  public readonly MAX_DURATION = 240;
  public readonly MIN_DURATION = 30;
  public cities = [];
  public sortingCriteria = ScenarioSortingCriterion;

  constructor(
    private readonly dialogRef: MatDialogRef<FilterScenarioDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly scenarioService: ScenarioService,
    private readonly cityService: CityService
  ) {
  }

  ngOnInit(): void {
    this.initFilterForm();
    this.getCities();
    this.initSortingForm();
    console.log(this.sortingCriteria);
  }

  /**
   * Close Dialog and pass form data to the component creating the Dialog
   */
  public filter(): void {
    this.scenarioService.currentScenarioFilter = this.filterForm.value;
    this.dialogRef.close(this.filterForm.value);
  }

  /**
   * Close Dialog and pass an empty object to the component creating the Dialog
   */
  public resetFilter(): void {
    this.scenarioService.currentScenarioFilter = undefined;
    this.dialogRef.close({});
  }

  /**
   * Initialize filter form group with value if already init in service
   */
  private initFilterForm(): void {
    this.filterForm = this.formBuilder.group({
      city: [this.scenarioService.currentScenarioFilter?.city],
      rate: [this.scenarioService.currentScenarioFilter?.rate],
      difficulty: [this.scenarioService.currentScenarioFilter?.difficulty],
      estimatedDuration: [this.scenarioService.currentScenarioFilter?.estimatedDuration],
      type: [this.scenarioService.currentScenarioFilter?.type]
    });
  }

  /**
   * Initialize sorting form group with value if already init in service
   */
  private initSortingForm(): void {
    this.sortingForm = this.formBuilder.group({
      sortingCriteria: [this.scenarioService.currentScenarioSorting]
    });
  }

  /**
   * Get cities list
   */
  private getCities(): void {
    this.cityService.readAllCity().subscribe( cities => this.cities = cities);
  }

}
