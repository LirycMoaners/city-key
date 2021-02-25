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

  /**
   * Try a key on the lock & show the result in a snackbar
   * @param key The key item we try
   */
  public onTryKey(key: Item): void {
    if (this.data.mechanism.unlockingItemId === key.uid) {
      this.data.items.splice(this.data.items.indexOf(key), 1);
      this.dialogRef.close(true);
    } else {
      this.snackBar.open('Wrong key, try another one or come back later.', undefined, {
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['mat-warn']
      });
    }
  }
}
