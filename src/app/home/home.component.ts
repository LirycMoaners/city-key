import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../core/http-services/game.service';
import { ScenarioService } from '../core/http-services/scenario.service';
import { Scenario } from '../shared/models/scenario.model';
import {MatDialog} from '@angular/material/dialog';
import {ScenarioDialogComponent} from '../game/scenario-dialog/scenario-dialog.component';

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
    this.scenarioService.readAllScenario().subscribe(scenarii => this.scenarii = scenarii);
  }

  seeDetails(scenario: Scenario): void {
    this.dialog.open(ScenarioDialogComponent, { data: scenario });
  }
}
