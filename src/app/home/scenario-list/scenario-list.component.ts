import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScenarioService } from 'src/app/core/http-services/scenario.service';
import { ScenarioFilter } from 'src/app/shared/models/scenario-filter';
import { Scenario } from 'src/app/shared/models/scenario.model';
import { FilterScenarioDialogComponent } from './filter-scenario-dialog/filter-scenario-dialog.component';
import { ScenarioDialogComponent } from './scenario-dialog/scenario-dialog.component';

@Component({
  selector: 'app-scenario-list',
  templateUrl: './scenario-list.component.html',
  styleUrls: ['./scenario-list.component.scss']
})
export class ScenarioListComponent implements OnInit {
  public scenarii: Scenario[] = [];

  constructor(
    private readonly scenarioService: ScenarioService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getScenarii(this.scenarioService.currentFilter);
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
      if (!!filter) {
        this.getScenarii(Object.entries(filter).length ? filter : null);
      }
    });
  }
}
