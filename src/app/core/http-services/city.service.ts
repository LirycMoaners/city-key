
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, find, first, switchMap } from 'rxjs/operators';
import { City } from 'src/app/shared/models/city.model';


@Injectable()
export class CityService {
  private cities$: BehaviorSubject<City[]> = new BehaviorSubject([] as City[]);

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly store: AngularFirestore
  ) { }

  /**
   * Get all cities
   */
  public readAllCity(): Observable<City[]> {
    if (!!this.cities$.getValue() && !!this.cities$.getValue().length) {
      return this.cities$;
    }
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(_ => this.store.collection<City>('cities').get()),
      switchMap(snapshot => {
        this.cities$.next(snapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id })));
        return this.cities$;
      })
    );
  }

  /**
   * Get a city
   * @param id The id of the city to retrieve
   */
  public readCity(id: string): Observable<City | undefined> {
    return this.readAllCity().pipe(
      first(),
      switchMap(cities => from(cities)),
      find(city => city.uid === id)
    );
  }

}
