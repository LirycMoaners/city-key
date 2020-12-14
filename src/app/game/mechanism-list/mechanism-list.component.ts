import { Component, OnInit } from '@angular/core';
import {Mechanism} from '../../shared/mechanism';
import {MechanismService} from '../../core/mechanism.service';

@Component({
  selector: 'app-mechanisme-list',
  templateUrl: './mechanism-list.component.html',
  styleUrls: ['./mechanism-list.component.scss']
})
export class MechanismListComponent implements OnInit {
  mechanisms: Mechanism[];

  constructor(
    private mechanismService: MechanismService
  ) { }

  ngOnInit(): void {
    this.mechanismService.read().subscribe( mechanisms =>
    {
      console.log(mechanisms);
      this.mechanisms = mechanisms;
    });
  }

}
