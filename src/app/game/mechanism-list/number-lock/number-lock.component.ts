import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mechanism } from 'src/app/shared/models/mechanism.model';

@Component({
  selector: 'app-number-lock',
  templateUrl: './number-lock.component.html',
  styleUrls: ['./number-lock.component.scss']
})
export class NumberLockComponent implements OnInit {
  public values: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  public code = '0000';

  constructor(
    public dialogRef: MatDialogRef<NumberLockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mechanism: Mechanism },
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Modify the entered code after modifying one value on 4
   * @param value The entered value from a wheel
   * @param index The wheel index
   */
  public setCodeDigit(value: string, index: number): void {
    this.code = this.code.substring(0, index) + value + this.code.substring(index + 1);
  }

  /**
   * Compare the entered code to the unlocking combination and close dialog if success
   */
  onTryCode(): void {
    if (Number(this.code) === this.data.mechanism.unlockingCombination) {
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
