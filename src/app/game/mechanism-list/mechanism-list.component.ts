import { Component, OnInit } from '@angular/core';
import { Mechanism } from '../../shared/models/mechanism.model';
import { MechanismService } from '../../core/http-services/mechanism.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mechanism-list',
  templateUrl: './mechanism-list.component.html',
  styleUrls: ['./mechanism-list.component.scss']
})
export class MechanismListComponent implements OnInit {
  public mechanisms$: Observable<Mechanism[]>;

  constructor(
    private mechanismService: MechanismService
  ) {
    this.mechanisms$ = this.mechanismService.readAll();
  }

  ngOnInit(): void {
  }

}
