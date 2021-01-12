import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mechanism } from '../../shared/models/mechanism.model';
import { Subscription } from 'rxjs';
import { GameService } from 'src/app/core/http-services/game.service';
import { NumberLockMechanismComponent } from './number-lock-mechanism/number-lock-mechanism.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Game } from 'src/app/shared/models/game.model';

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
    const dialogRef = this.dialog.open(NumberLockMechanismComponent, {
      minWidth: '100vw',
      height: '100vh',
      data: {mechanism},
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
