import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ScenarioType} from '../../shared/enums/scenario-type.enum';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter-scenario-dialog',
  templateUrl: './filter-scenario-dialog.component.html',
  styleUrls: ['./filter-scenario-dialog.component.scss']
})
export class FilterScenarioDialogComponent implements OnInit {
  public title = 'Filters';
  public rate: 0 | 1 | 2 | 3 | 4 | 5;
  public difficulty: 1 | 2 | 3 | 4 | 5;
  public estimatedDuration: number;
  public type: ScenarioType;
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

  filter(): void {
    console.log(this.form.value)
    this.dialogRef.close({data: 'coucou'});
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      rate: [''],
      difficulty: [''],
      estimatedDuration: [''],
      type: ['']
    });
  }

}
