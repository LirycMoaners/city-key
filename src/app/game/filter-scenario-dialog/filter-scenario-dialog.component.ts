import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-filter-scenario-dialog',
  templateUrl: './filter-scenario-dialog.component.html',
  styleUrls: ['./filter-scenario-dialog.component.scss']
})
export class FilterScenarioDialogComponent implements OnInit {
  public title = 'Filtres';

  constructor(
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<FilterScenarioDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  filter(): void {
    this.dialogRef.close({data: 'coucou'});
  }

}
