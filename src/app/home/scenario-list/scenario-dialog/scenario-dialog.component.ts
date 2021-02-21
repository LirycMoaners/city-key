import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GameService } from '../../../core/http-services/game.service';
import { Router } from '@angular/router';
import { Difficulty } from 'src/app/shared/enums/difficulty.enum';
import { first, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Game } from 'src/app/shared/models/game.model';
import { ScenarioService } from 'src/app/core/http-services/scenario.service';
import { Scenario } from 'src/app/shared/models/scenario.model';


@Component({
  selector: 'app-scenario-dialog',
  templateUrl: './scenario-dialog.component.html',
  styleUrls: ['./scenario-dialog.component.scss']
})
export class ScenarioDialogComponent implements OnInit {
  public Difficulty: typeof Difficulty = Difficulty;
  public game: Game;
  public isStartVisible = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Scenario,
    private readonly gameService: GameService,
    private readonly scenarioService: ScenarioService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.gameService.getGamesByScenarioId(this.data.uid).pipe(first()).subscribe(games => {
      this.isStartVisible = true;
      if (games) {
        this.game = games[0];
      }
    });
  }

  /**
   * Create a game from a scenario and redirect to the game page
   * @param scenario The scenario to start
   */
  public startScenario(): void {
    let obs: Observable<Game>;
    if (this.game) {
      this.gameService.setCurrentGame(this.game);
      obs = of(null);
    } else {
      obs = this.scenarioService.readScenario(this.data).pipe(
        switchMap((scenario: Scenario) => this.gameService.createGame(scenario))
      );
    }
    obs.subscribe(() => this.router.navigate(['/game']));
  }

  public restartScenario(): void {
    this.gameService.deleteGame(this.game).pipe(
      switchMap(() => this.scenarioService.readScenario(this.data)),
      switchMap(scenario => this.gameService.createGame(scenario))
    ).subscribe(() => this.router.navigate(['/game']));
  }
}
