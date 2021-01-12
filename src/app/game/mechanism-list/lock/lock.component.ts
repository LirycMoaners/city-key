import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemType } from 'src/app/shared/enums/item-type.enum';
import { Item } from 'src/app/shared/models/item.model';
import { Mechanism } from 'src/app/shared/models/mechanism.model';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.scss']
})
export class LockComponent implements OnInit {
  public keys: Item[] = [];

  constructor(
    public dialogRef: MatDialogRef<LockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mechanism: Mechanism, items: Item[] },
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.keys = this.data.items.filter(item => item.type === ItemType.KEY);
  }

  public onTryKey(key: Item): void {
    if (this.data.mechanism.unlockingKeyId === key.id) {
      this.dialogRef.close(true);
    } else {
      this.snackBar.open('Wrong key, try another one or come back later.', null, {
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['mat-warn']
      });
    }
  }
}
