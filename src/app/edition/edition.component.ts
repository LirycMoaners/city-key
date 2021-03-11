import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ScenarioService } from '../core/http-services/scenario.service';
import { Scenario } from '../shared/models/scenario.model';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {
  public scenario?: Scenario;
  public formGroup: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly scenarioService: ScenarioService
  ) {
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    if (this.scenarioService.currentEditionScenario) {
      this.scenarioService.readScenario(this.scenarioService.currentEditionScenario).subscribe(scenario => this.scenario = scenario);
    }
  }

}
