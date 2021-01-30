import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {ScenarioType} from '../../shared/enums/scenario-type.enum';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter-scenario-dialog',
  templateUrl: './filter-scenario-dialog.component.html',
  styleUrls: ['./filter-scenario-dialog.component.scss']
})
export class FilterScenarioDialogComponent implements OnInit {
  public title = 'Filters';
  public form: FormGroup;
  public types = ScenarioType;

  constructor(
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<FilterScenarioDialogComponent>,
    private readonly formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Close Dialog and passes form data to the component creating the Dialog
   */
  filter(): void {
    this.dialogRef.close(this.form.value);
  }

  /**
   * Initialize formgroup without values
   */
  initForm(): void {
    this.form = this.formBuilder.group({
      rate: [''],
      difficulty: [''],
      estimatedDuration: [''],
      type: ['']
    });
  }

}
