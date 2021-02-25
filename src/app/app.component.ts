import { Component } from '@angular/core';
import { of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly auth: AngularFireAuth
  ) {
    this.auth.user.pipe(
      first(),
      switchMap(user => !user ? of(this.auth.signInAnonymously()) : of(null))
    ).subscribe();
  }
}
