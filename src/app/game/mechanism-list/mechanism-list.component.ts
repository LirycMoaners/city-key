import {Component, OnInit} from '@angular/core';
import {Mechanism} from '../../shared/models/mechanism.model';
import {MechanismService} from '../../core/http-services/mechanism.service';
import {Observable} from 'rxjs';
import {NumberLockMechanismComponent} from './number-lock-mechanism/number-lock-mechanism.component';
import {MatDialog} from '@angular/material/dialog';
import {MechanismType} from '../../shared/enums/mechanism-type.enum';
import {ItemService} from '../../core/http-services/item.service';

@Component({
  selector: 'app-mechanism-list',
  templateUrl: './mechanism-list.component.html',
  styleUrls: ['./mechanism-list.component.scss']
})
export class MechanismListComponent implements OnInit {
  public mechanisms$: Observable<Mechanism[]>;

  constructor(
    private mechanismService: MechanismService,
    private dialog: MatDialog,
    private itemService: ItemService
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
      }
    });
  }
}
