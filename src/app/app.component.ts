import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { first, map, shareReplay, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly auth: AngularFireAuth
  ) {
    this.auth.user.pipe(
      first(),
      switchMap(user => !user ? of(this.auth.signInAnonymously()) : of(null))
    ).subscribe();
  }
}
