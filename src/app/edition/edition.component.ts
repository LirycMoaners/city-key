import { Component, OnInit } from '@angular/core';
import { ScenarioService } from '../core/http-services/scenario.service';
import { Scenario } from '../shared/models/scenario.model';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {
  public scenario?: Scenario;

  constructor(
    private scenarioService: ScenarioService
  ) { }

  ngOnInit(): void {
    this.scenario = this.scenarioService.currentEditionScenario;
  }

}
