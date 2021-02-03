import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../core/http-services/game.service';
import { ScenarioService } from '../core/http-services/scenario.service';
import { Scenario } from '../shared/models/scenario.model';
import {MatDialog} from '@angular/material/dialog';
import {ScenarioDialogComponent} from './scenario-dialog/scenario-dialog.component';
import {FilterScenarioDialogComponent} from './filter-scenario-dialog/filter-scenario-dialog.component';
import {ScenarioFilter} from '../shared/models/scenario-filter';
import {ScenarioType} from '../shared/enums/scenario-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public scenarii: Scenario[] = [];
  public scenarioFilter: ScenarioFilter = null;

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
    this.scenarioService.readAllScenario(this.scenarioFilter).subscribe(scenarii => this.scenarii = scenarii);
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
      this.scenarioFilter = data;
      this.initScenarii();
    });
  }
}
