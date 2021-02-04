import { Component, OnInit } from '@angular/core';
import { ScenarioService } from '../core/http-services/scenario.service';
import { Scenario } from '../shared/models/scenario.model';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioDialogComponent } from './scenario-dialog/scenario-dialog.component';
import { FilterScenarioDialogComponent } from './filter-scenario-dialog/filter-scenario-dialog.component';
import { ScenarioFilter } from '../shared/models/scenario-filter';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public scenarii: Scenario[] = [];

  constructor(
    private readonly scenarioService: ScenarioService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getScenarii(null);
  }

  /**
   * Get scenarii list to display
   * @param filter The scenario filter
   */
  private getScenarii(filter: ScenarioFilter): void {
    this.scenarioService.readAllScenario(filter).subscribe(scenarii => this.scenarii = scenarii);
  }

  /**
   * Open a dialog with additional information on the selected scenario and allows to start it or abort
   * @param scenario The scenario to show details about
   */
  public seeDetails(scenario: Scenario): void {
    this.dialog.open(ScenarioDialogComponent, {
      minWidth: '100vw',
      height: '100vh',
      data: scenario
    });
  }

  /**
   * Open a dialog to filter the scenario list
   */
  public openFilterScenarioDialog(): void {
    this.dialog.open(FilterScenarioDialogComponent).afterClosed().subscribe( filter => {
      this.getScenarii(filter);
    });
  }
}
