import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/models/item.model';
import { Mechanism } from 'src/app/shared/models/mechanism.model';
import { Step } from 'src/app/shared/models/step.model';

@Component({
  selector: 'app-step-dialog',
  templateUrl: './step-dialog.component.html',
  styleUrls: ['./step-dialog.component.scss']
})
export class StepDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { step: Step, mechanisms: Mechanism[], items: Item[] }
  ) { }

  ngOnInit(): void {
  }

}
