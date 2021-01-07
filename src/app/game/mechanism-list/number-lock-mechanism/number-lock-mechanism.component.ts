import {Component, Inject, OnInit} from '@angular/core';
import {MechanismService} from '../../../core/http-services/mechanism.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Mechanism} from '../../../shared/models/mechanism.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-number-lock-mechanism',
  templateUrl: './number-lock-mechanism.component.html',
  styleUrls: ['./number-lock-mechanism.component.scss']
})
export class NumberLockMechanismComponent implements OnInit {
  private mechanism: Mechanism;

  constructor(
    public dialogRef: MatDialogRef<NumberLockMechanismComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.mechanism = this.data.mechanism;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onTryCode(code: HTMLInputElement): void {
    if (Number(code.value) === this.data.mechanism.unlockingKey) {
      window.alert('New items were unlocked!');
      this.dialogRef.close();
    } else {
      window.alert('Wrong code, try again or come back later');
    }
  }
}
