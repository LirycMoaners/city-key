import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../core/http-services/game.service';
import { ScenarioService } from '../core/http-services/scenario.service';
import { Scenario } from '../shared/models/scenario.model';
import {MatDialog} from '@angular/material/dialog';
import {ScenarioDialogComponent} from '../game/scenario-dialog/scenario-dialog.component';
import {FilterScenarioDialogComponent} from '../game/filter-scenario-dialog/filter-scenario-dialog.component';

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
    private readonly gameService: GameService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initScenarii();
  }

  initScenarii(): void {
    this.scenarioService.readAllScenario().subscribe(scenarii => this.scenarii = scenarii);
  }

  /**
   * Open a dialog with additional information on the selected scenario and allows to start it or abort
   * @param scenario The scenario to show details about
   */
  public seeDetails(scenario: Scenario): void {
    this.dialog.open(ScenarioDialogComponent, { data: scenario });
  }

  /**
   * Open a dialog to filter the scenario list
   */
  public openFilterScenarioDialog(): void {
    this.dialog.open(FilterScenarioDialogComponent).afterClosed().subscribe( data => {

      this.initScenarii();

      if (data.difficulty) {
        this.filterDifficulty(Number(data.difficulty));
      }
      if (data.rate) {
        this.filterRate(Number(data.rate));
      }
      if (data.estimatedDuration) {
        this.filterDuration(Number(data.estimatedDuration));
      }
      if (data.type) {
        this.filterType(data.type.index);
      }
    });
  }

  /**
   * Filter scenarii where difficulty = param
   * @param difficulty
   * @private
   */
  private filterDifficulty(difficulty: number): void {
    this.scenarii = this.scenarii.filter( scenario => scenario.scenarioMetadata.difficulty === difficulty);
  }

  /**
   * Filter scenarii where ScenarioType index = param
   * @param typeId
   * @private
   */
  private filterType(typeId: number): void {
    this.scenarii = this.scenarii.filter(scenario => scenario.scenarioMetadata.type.valueOf() === typeId);
  }

  /**
   * Filter scenarii where estimated duration <= param
   * @param estimatedDuration
   * @private
   */
  private filterDuration(estimatedDuration: number): void {
    this.scenarii = this.scenarii.filter( scenario => scenario.scenarioMetadata.estimatedDuration <= estimatedDuration);
  }

  /**
   * Filter scenarii where rate = param
   * @param rate
   * @private
   */
  private filterRate(rate: number): void {
    this.scenarii = this.scenarii.filter( scenario => scenario.scenarioMetadata.rate === rate);
  }
}
