import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScenarioService } from 'src/app/core/http-services/scenario.service';
import { ScenarioStatus } from 'src/app/shared/enums/scenario-status.enum';
import { Scenario } from 'src/app/shared/models/scenario.model';

@Component({
  selector: 'app-creation-list',
  templateUrl: './creation-list.component.html',
  styleUrls: ['./creation-list.component.scss']
})
export class CreationListComponent implements OnInit {
  public scenarii: Scenario[] = [];
  public ScenarioStatus: typeof ScenarioStatus = ScenarioStatus;

  constructor(
    private readonly scenarioService: ScenarioService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.scenarioService.readAllScenarioByAuthorId().subscribe(scenarii => this.scenarii = scenarii);
  }

  public editScenario(scenario: Scenario): void {
    this.scenarioService.currentEditionScenario = { ...scenario };
    this.router.navigate(['/edition']);
  }

}
