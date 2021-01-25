import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../core/http-services/game.service';
import { ScenarioService } from '../core/http-services/scenario.service';
import { Scenario } from '../shared/models/scenario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public scenarii: Scenario[] = [];

  constructor(
    private readonly router: Router,
    private readonly scenarioService: ScenarioService,
    private readonly gameService: GameService
  ) { }

  ngOnInit(): void {
    this.scenarioService.readAllScenario().subscribe(scenarii => this.scenarii = scenarii);
  }

  /**
   * Create a game from a scenario and redirect to the game page
   * @param scenario The scenario to start
   */
  public startScenario(scenario: Scenario): void {
    this.gameService.createGame(scenario).subscribe(() => this.router.navigate(['/game']));
  }

}
