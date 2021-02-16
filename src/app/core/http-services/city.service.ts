
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';


@Injectable()
export class CityService {

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly store: AngularFirestore
  ) { }

  /**
   * Get all cities
   */
  public readAllCity(): Observable<string[]> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(_ => this.store.collection<{name: string}>('cities').valueChanges()),
      map(cities => cities.map(city => city.name))
    );
  }
}
