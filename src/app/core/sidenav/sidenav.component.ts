import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() linkClicked: EventEmitter<void> = new EventEmitter();
  public routes: Routes;

  constructor(
    private readonly router: Router
  ) {
    this.routes = this.router.config.filter(route => route.path !== '' && route.path !== '**');
  }

  ngOnInit(): void {
  }

  public closeSidenav(): void {
    this.linkClicked.emit();
  }
}
