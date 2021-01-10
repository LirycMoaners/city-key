import { Component, OnInit } from '@angular/core';
import { Mechanism } from '../../shared/models/mechanism.model';
import { MechanismService } from '../../core/http-services/mechanism.service';
import { Observable } from 'rxjs';
import { NumberLockMechanismComponent } from './number-lock-mechanism/number-lock-mechanism.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemService } from '../../core/http-services/item.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mechanism-list',
  templateUrl: './mechanism-list.component.html',
  styleUrls: ['./mechanism-list.component.scss']
})
export class MechanismListComponent implements OnInit {
  public mechanisms$: Observable<Mechanism[]>;

  constructor(
    private readonly mechanismService: MechanismService,
    private readonly itemService: ItemService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.mechanisms$ = this.mechanismService.readAll();
  }

  ngOnInit(): void {
  }

  openMechanism(mechanism: Mechanism): void {
    const dialogRef = this.dialog.open(NumberLockMechanismComponent, {
      minWidth: '100vw',
      height: '100vh',
      data: {mechanism},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.itemService.add(mechanism.unlockedItems).subscribe();
        this.mechanismService.delete(mechanism.id).subscribe();
        this.snackBar.open('Success! New items unlocked!', 'Ok', {
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/game/inventory']);
      }
    });
  }
}
