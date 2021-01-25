import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Scenario} from '../../shared/models/scenario.model';
import {GameService} from '../../core/http-services/game.service';
import {Router} from '@angular/router';
import {Pipe} from '@angular/core';

@Component({
  selector: 'app-scenario-dialog',
  templateUrl: './scenario-dialog.component.html',
  styleUrls: ['./scenario-dialog.component.scss']
})
export class ScenarioDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Scenario,
    private readonly gameService: GameService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Create a game from a scenario and redirect to the game page
   * @param scenario The scenario to start
   */
  public startScenario(scenario: Scenario): void {
    this.gameService.createGame(scenario).subscribe(() => this.router.navigate(['/game']));
  }
}
