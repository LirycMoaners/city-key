import { Component, OnInit } from '@angular/core';
import {Mechanism} from '../../shared/models/mechanism.model';
import {MechanismService} from '../../core/http-services/mechanism.service';

@Component({
  selector: 'app-mechanism-list',
  templateUrl: './mechanism-list.component.html',
  styleUrls: ['./mechanism-list.component.scss']
})
export class MechanismListComponent implements OnInit {
  mechanisms: Mechanism[];

  constructor(
    private mechanismService: MechanismService
  ) { }

  ngOnInit(): void {
    this.mechanismService.readAll().subscribe(mechanisms =>
    {
      this.mechanisms = mechanisms;
    });
  }

}
