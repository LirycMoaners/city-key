import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Mechanism} from '../../../shared/models/mechanism.model';
import {TextDialogComponent} from '../../../shared/utils/text-dialog/text-dialog.component';

@Component({
  selector: 'app-number-lock-mechanism',
  templateUrl: './number-lock-mechanism.component.html',
  styleUrls: ['./number-lock-mechanism.component.scss']
})
export class NumberLockMechanismComponent implements OnInit {
  private mechanism: Mechanism;

  constructor(
    public codeDialogRef: MatDialogRef<NumberLockMechanismComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.mechanism = this.data.mechanism;
  }

  onClose(): void {
    this.codeDialogRef.close(false);
  }

  onTryCode(code: HTMLInputElement): void {
    if (Number(code.value) === this.data.mechanism.unlockingKey) {
      const textDialogRef = this.dialog.open(TextDialogComponent, {
        data: 'New items were unlocked!',
      });
      textDialogRef.afterClosed().subscribe(result => {
        this.codeDialogRef.close(true);
      });
    } else {
      const textDialogRef = this.dialog.open(TextDialogComponent, {
        data: 'Wrong code, try again or come back later',
      });
    }
  }
}
