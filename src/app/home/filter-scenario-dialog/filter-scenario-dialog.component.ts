import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {ScenarioType} from '../../shared/enums/scenario-type.enum';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenarioService} from '../../core/http-services/scenario.service';

@Component({
  selector: 'app-filter-scenario-dialog',
  templateUrl: './filter-scenario-dialog.component.html',
  styleUrls: ['./filter-scenario-dialog.component.scss']
})
export class FilterScenarioDialogComponent implements OnInit {
  public title = 'Filters';
  public form: FormGroup;
  public types = ScenarioType;
  public readonly MAX_DURATION = 400;
  public readonly MIN_DURATION = 15;
  public cities = [];

  constructor(
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<FilterScenarioDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private scenarioService: ScenarioService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initCities();
  }

  /**
   * Close Dialog and passes form data to the component creating the Dialog
   */
  filter(): void {
    console.log(this.form.value)
    this.dialogRef.close(this.form.value);
  }

  /**
   * Initialize formgroup without values
   */
  initForm(): void {
    this.form = this.formBuilder.group({
      city: [''],
      rate: [''],
      difficulty: [''],
      estimatedDuration: [''],
      type: ['']
    });
  }

  initCities(): void {
    this.scenarioService.readAllAvailableCities().subscribe( cities => this.cities = cities);
  }

}
