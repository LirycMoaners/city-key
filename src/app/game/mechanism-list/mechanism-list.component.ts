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
import { ResembleComponent } from './resemble/resemble.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mechanism-list',
  templateUrl: './mechanism-list.component.html',
  styleUrls: ['./mechanism-list.component.scss']
})
export class MechanismListComponent implements OnInit, OnDestroy {
  public mechanisms: Mechanism[] = [];
  private game: Game;
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly gameService: GameService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.gameService.getCurrentGame().subscribe(game => {
        this.game = game;
        this.mechanisms = this.game.scenario.mechanisms.filter(mechanism => this.game.mechanismsId.includes(mechanism.uid));
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * Open the mechanism in parameter in a dialog and update game if we succeded it
   * @param mechanism The mechanism to open
   */
  openMechanism(mechanism: Mechanism): void {
    let component: ComponentType<unknown>;
    switch (mechanism.type) {
      case MechanismType.SSIM:
        component = ResembleComponent;
        break;
      case MechanismType.FOUR_NRS_LOCK:
        component = NumberLockComponent;
        break;
      default:
        component = LockComponent;
    }

    const dialogRef = this.dialog.open(component, {
      minWidth: '100vw',
      height: '100vh',
      data: { mechanism, items: this.game.scenario.items.filter(item => this.game.itemsId.includes(item.uid)) },
      disableClose: true
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result === true) {
          this.game.itemsId.push(...mechanism.unlockedItemsId);
          this.game.mechanismsId.push(...mechanism.unlockedMechanismsId);
          this.game.markersId.push(...mechanism.unlockedMarkersId);
          this.game.completedMechanismsId.push(mechanism.uid);
          this.game.mechanismsId.splice(this.game.mechanismsId.indexOf(mechanism.uid), 1);
          return this.gameService.updateGame(this.game);
        }
      })
    ).subscribe(_ => {
      this.snackBar.open('Success! New items unlocked!', 'Ok', {
        verticalPosition: 'bottom'
      });
      this.router.navigate(['/game']);
    });
  }
}
