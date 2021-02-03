import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Scenario } from 'src/app/shared/models/scenario.model';

@Injectable()
export class ScenarioService {

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly store: AngularFirestore
  ) { }

  /**
   * Get all the scenarii
   */
  public readAllScenario(): Observable<Scenario[]> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(_ => this.store.collection<Scenario>('scenarii').snapshotChanges()),
      map(changes => changes.map(c => {
        const scenario = {...c.payload.doc.data(), uid: c.payload.doc.id};
        scenario.scenarioMetadata.creationDate = new Date(scenario.scenarioMetadata.creationDate);
        scenario.scenarioMetadata.lastUpdateDate = new Date(scenario.scenarioMetadata.lastUpdateDate);
        return scenario;
      }))
    );
  }

  public readScenario(id: string): Observable<Scenario> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(_ => this.store.collection<Scenario>('scenarii').doc(id).get()),
      first(),
      map(change => {
        const scenario = change.data();
        scenario.scenarioMetadata.creationDate = new Date(scenario.scenarioMetadata.creationDate);
        scenario.scenarioMetadata.lastUpdateDate = new Date(scenario.scenarioMetadata.lastUpdateDate);
        return scenario;
      })
    );
  }
}
