import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-number-lock-mechanism',
  templateUrl: './number-lock-mechanism.component.html',
  styleUrls: ['./number-lock-mechanism.component.scss']
})
export class NumberLockMechanismComponent implements OnInit {
  public values: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public code = '0000';

  constructor(
    public dialogRef: MatDialogRef<NumberLockMechanismComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  public setCodeDigit(value: string, index: number): void {
    this.code = this.code.substring(0, index) + value + this.code.substring(index + 1);
  }

  onTryCode(): void {
    if (Number(this.code) === this.data.mechanism.unlockingKey) {
      this.dialogRef.close(true);
    } else {
      this.snackBar.open('Wrong code, try again or come back later.', null, {
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['mat-warn']
      });
    }
  }
}
