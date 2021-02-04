import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Scenario } from 'src/app/shared/models/scenario.model';
import {ScenarioFilter} from '../../shared/models/scenario-filter';


@Injectable()
export class ScenarioService {
  private mockAvailableCities = ['Bruxelles', 'Mons', 'Charleroi', 'Gand', 'Anvers'];

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly store: AngularFirestore
  ) { }

  /**
   * Get all the scenarii or filtered list of scenarii if param
   * @param filter Filter properties
   */
  public readAllScenario(scenariofilter: ScenarioFilter): Observable<Scenario[]> {
    return this.auth.user.pipe(
      filter(user => user !== null),
      first(),
      switchMap(_ => this.store.collection<Scenario>('scenarii').snapshotChanges()),
      map(changes => changes.map(c => {
        const scenario = {...c.payload.doc.data(), uid: c.payload.doc.id};
        scenario.scenarioMetadata.creationDate = new Date(scenario.scenarioMetadata.creationDate);
        scenario.scenarioMetadata.lastUpdateDate = new Date(scenario.scenarioMetadata.lastUpdateDate);
        return scenario;
      })),
      map(scenarrii => {
        return scenarrii.filter(scenario =>
          !!scenariofilter ? (
            scenariofilter.difficulty !== null ? scenario.scenarioMetadata.difficulty === scenariofilter.difficulty : true
            && scenariofilter.estimatedDuration !== null ? scenario.scenarioMetadata.estimatedDuration <= +scenariofilter.estimatedDuration : true
            && scenariofilter.city !== null ? scenario.scenarioMetadata.city === scenariofilter.city : true
            && scenariofilter.type !== null ? scenario.scenarioMetadata.type === scenariofilter.type : true
            && scenariofilter.rate !== null ? scenario.scenarioMetadata.rate >= +scenariofilter.rate : true
          ) : true
        );
      })
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

  /**
   * Get all available cities for scenarii
   */
  public readAllAvailableCities(): Observable<string[]> {
    return of(this.mockAvailableCities);
  }
}
