import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mechanism } from '../../shared/models/mechanism.model';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/core/http-services/game.service';
import { NumberLockComponent } from './number-lock/number-lock.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Game } from 'src/app/shared/models/game.model';
import { MechanismType } from 'src/app/shared/enums/mechanism-type.enum';
import { LockComponent } from './lock/lock.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-mechanism-list',
  templateUrl: './mechanism-list.component.html',
  styleUrls: ['./mechanism-list.component.scss']
})
export class MechanismListComponent implements OnInit, OnDestroy {
  public game: Game;
  private subscriptions: Subscription[] = [];

  constructor(
    private gameService: GameService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.subscriptions.push(
      this.gameService.getCurrentGame().subscribe(game => this.game = game)
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
  openMechanism(mechanism: Mechanism): void {
    let component: ComponentType<unknown>;
    switch (mechanism.type) {
      case MechanismType.LOCK:
        component = LockComponent;
        break;
      case MechanismType.FOUR_NRS_LOCK:
        component = NumberLockComponent;
        break;
      default:
        component = NumberLockComponent;
    }

    const dialogRef = this.dialog.open(component, {
      minWidth: '100vw',
      height: '100vh',
      data: { mechanism, items: this.game.items },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.game.items.push(...mechanism.unlockedItems);
        this.game.completedMechanismsId.push(mechanism.id);
        this.game.mechanisms.splice(this.game.mechanisms.indexOf(mechanism), 1);
        this.gameService.updateCurrentGame(this.game);
        this.snackBar.open('Success! New items unlocked!', 'Ok', {
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/game/inventory']);
      }
    });
  }
}
